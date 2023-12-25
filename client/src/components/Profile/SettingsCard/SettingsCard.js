// IMPORTS
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";

import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "../CustomInput/CustomInput";
import userService from "../../../services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

//APP
export default function SettingsCard() {
  // STATES--------------------------------------------
  const [user, setUser] = useState(useSelector((state) => state.account) || {});
  const account = useSelector((state) => state.account);
  console.log(account);
  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //FORM STATE
  const [edit, update] = useState({
    // Initially EDIT, so it's disabled at first
    disabled: true,
    isEdit: true, //isEdit refers to the Button
    showPassword: false,
  });

  //TAB STATE
  const [tabValue, setTabValue] = React.useState("one");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // BUTTON EDIT -> UPDATE + SUBMIT INFO
  const changeButton = (event) => {
    event.preventDefault();
    edit.showPassword = false;
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    if (edit.isEdit === true) {
      // call api edit profile
      handleSubmit(user);
      console.log("user: ", user);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const respone = await userService.updateProfile(user._id, data);
      console.log("res: ", respone);
      if (respone) {
        localStorage.setItem(
          "account",
          JSON.stringify(await userService.getUserById(user._id))
        );
      }
      toast.success("Update Profile successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("Update Profile failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "70%" }}>
      {/* TABS */}
      <br></br>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Account" />
      </Tabs>
      <Divider></Divider>

      {/* MAIN CONTENT CONTAINER */}
      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "40vh" },
            textAlign: { xs: "center", md: "start" },
          }}
        >
          {/* FIELDS */}
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              {/* ROW 1: FIRST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  name="firstName"
                  value={user.firstName}
                  title="First Name"
                  onChange={handleUser}
                  dis={edit.disabled}
                ></CustomInput>
              </Grid>

              {/* ROW 1: LAST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  name="lastName"
                  value={user.lastName}
                  onChange={handleUser}
                  title="Last Name"
                  dis={edit.disabled}
                ></CustomInput>
              </Grid>

              {/* ROW 2: MIDDLE NAME */}
              <Grid item xs={6}>
                <CustomInput
                  name="midName"
                  value={user.middleName}
                  onChange={handleUser}
                  title="Middle Name"
                  dis={edit.disabled}
                ></CustomInput>
              </Grid>

              {/* ROW 3: PHONE */}
              <Grid item xs={6}>
                <CustomInput
                  name="phone"
                  value={user.phone}
                  onChange={handleUser}
                  title="Phone Number"
                  dis={edit.disabled}
                  //DIALING CODE (84+)
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+84</InputAdornment>
                    ),
                  }}
                ></CustomInput>
              </Grid>

              {/* ROW 3: EMAIL */}
              <Grid item xs={6}>
                <CustomInput
                  name="email"
                  value={user.email}
                  onChange={handleUser}
                  title="Email Address"
                  dis={true}
                ></CustomInput>
              </Grid>

              {/* ROW 4: PASSWORD */}
              <Grid item xs={6}>
                <CustomInput
                  name="address"
                  value={user.address}
                  onChange={handleUser}
                  title="Address"
                  dis={edit.disabled}
                ></CustomInput>
              </Grid>

              {/* BUTTON */}
              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={changeButton}
                >
                  {edit.isEdit === false ? "UPDATE" : "EDIT"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
      <ToastContainer limit={2} />
    </Card>
  );
}
