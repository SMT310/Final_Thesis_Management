import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import authService from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountsSlices from "../../../redux/accountsSlice";
import { GoogleLogout } from "react-google-login";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import PersonIcon from "@mui/icons-material/Person";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import TerminalIcon from "@mui/icons-material/Terminal";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PortraitIcon from "@mui/icons-material/Portrait";
import TopicIcon from "@mui/icons-material/Topic";
import ApprovalIcon from "@mui/icons-material/Approval";
import ApartmentIcon from "@mui/icons-material/Apartment";
const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "40px",
});
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CLIENT_ID =
    "795154931381-npgldkbjojtham774jbh1193sji0d6fi.apps.googleusercontent.com";
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [settings, setSettings] = useState();
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const onSuccess = () => {
    navigate("/login");
  };

  const account = useSelector((state) => state.account);

  const role = account.type;
  useEffect(() => {
    if (role === "student")
      setSettings([
        { title: "Profile", link: "/student/profile", icon2: PortraitIcon },
        {
          title: "Register Thesis",
          link: "/student/assign-thesis",
          icon2: AppRegistrationIcon,
        },
        {
          title: "Manage Thesis",
          link: "/student/manage-thesis",
          icon2: TopicIcon,
        },
        { title: "Logout", link: "/logout", icon2: LogoutIcon },
      ]);
    else if (role === "faculty") {
      if (account.isHeadDep)
        setSettings([
          { title: "Profile", link: "/faculty/profile", icon2: PortraitIcon },
          {
            title: "Register Thesis",
            link: "/faculty/register-thesis",
            icon2: AppRegistrationIcon,
          },
          {
            title: "Manage Thesis",
            link: "/head-lecturer/manage-thesis",
            icon2: TopicIcon,
          },
          {
            title: "Approval Thesis",
            link: "/head-lecturer/pending-thesis",
            icon2: ApprovalIcon,
          },
          {
            title: "Distribute Faculty",
            link: "/head-lecturer/approved-thesis",
            icon2: ApartmentIcon,
          },
          { title: "Logout", link: "/logout", icon2: LogoutIcon },
        ]);
      else
        setSettings([
          { title: "Profile", link: "/faculty/profile", icon2: PortraitIcon },
          {
            title: "Register Thesis",
            link: "/faculty/register-thesis",
            icon2: AppRegistrationIcon,
          },
          {
            title: "Manage Thesis",
            link: "/faculty/manage-thesis",
            icon2: TopicIcon,
          },
          { title: "Logout", link: "/logout", icon2: LogoutIcon },
        ]);
    } else if (role === "admin") {
      setSettings([
        { title: "Dashboard", link: "/dashboard", icon2: EqualizerIcon },
        { title: "Manage Student", link: "/manage-student", icon2: PersonIcon },
        {
          title: "Manage Lecturer",
          link: "/manage-faculty",
          icon2: PsychologyAltIcon,
        },
        {
          title: "Manage Schedule",
          link: "/manage-schedule",
          icon2: ScheduleSendIcon,
        },
        { title: "Manage Thesis", link: "/manage-thesis", icon2: TopicIcon },
        // { title: "Manage Term", link: "/manage-term", icon2: TerminalIcon },
        { title: "Manage Majors", link: "/manage-major", icon2: TerminalIcon },
        { title: "Logout", link: "/logout", icon2: LogoutIcon },
      ]);
    }
  }, []);

  const drawer = (
    <Box height="100%" sx={{ backgroundColor: "brown" }}>
      <CssBaseline />
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            // mr: 2,
            display: { xs: "none", md: "flex" },
            fontSize: "20px",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".25rem",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          THESIS MANAGE
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ ml: "8px" }}>
          {settings?.map((setting, index) => {
            const IconComponent =
              setting.icon2 !== "EqualizerIcon" ? setting.icon2 : EqualizerIcon;
            console.log(setting);
            return (
              <Link
                Link
                to={`${setting.link === "/logout" ? "/" : setting.link}`}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={async () => {
                      handleListItemClick(index);
                      if (setting.title === "Logout") {
                        dispatch(accountsSlices.actions.deleteAccount());
                        navigate("/login");
                      }
                    }}
                  >
                    <StyledListItemIcon sx={{ minWidth: "40px" }}>
                      <IconComponent fontSize="medium" sx={{ color: "#fff" }} />
                    </StyledListItemIcon>
                    <ListItemText
                      primary={`${setting.title}`}
                      primaryTypographyProps={{
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
          <Box sx={{ width: "100%" }} className="btn-logout">
            <GoogleLogout
              className="btn-log"
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={onSuccess}
            />
          </Box>
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}

export default Sidebar;
