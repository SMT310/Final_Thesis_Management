import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import authService from '../../services/authServices';

function AuthUser({user}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [settings, setSettings] = React.useState([]);
    const [selectedSetting, setSelectedSetting] = React.useState('');
    
    const navigate = useNavigate();
    React.useEffect(()=>{
        
        if (user.type === "student")
            setSettings(['Profile', 'Register Thesis', 'Manage Thesis', 'Logout']);
        else if (user.type === "faculty") {
            if (user.isHeadDep)
                setSettings(['Profile', 'Register Thesis', 'Manage Thesis', 'Approval Thesis', 'Distribute Faculty', 'Logout']);
            else setSettings(['Profile', 'Register Thesis', 'Manage Thesis', 'Logout']);
        }
        else if (user.type === "admin") {
            setSettings(['Profile', 'Dashboard', 'Logout']);
        }
    },[])

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleClick = async (e) => {
        const selectedSetting = e.currentTarget.getAttribute('data-value');
        setSelectedSetting(selectedSetting);
        handleCloseUserMenu();
        console.log(selectedSetting);

        // Thực hiện điều hướng dựa trên giá trị selectedSetting
        if (selectedSetting === 'Profile') {
          navigate('/profile');
        } else if (selectedSetting === 'Register Thesis') {
          navigate('/register-thesis');
        } else if (selectedSetting === 'Manage Thesis') {
          navigate('/faculty-manage-thesis');
        } else if (selectedSetting === 'Approval Thesis') {
          navigate('/approval-thesis');
        } else if (selectedSetting === 'Distribute Faculty') {
          navigate('/distribute-faculty');
        } else if (selectedSetting === 'Dashboard') {
            navigate('/dashboard');
        } else if (selectedSetting === 'Logout') {
          console.log(user);
          await authService.logout(user);
          localStorage.removeItem('account');
          navigate('/login');
        }
    };
    
    return ( 
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleClick}  data-value={setting}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
}

export default AuthUser;