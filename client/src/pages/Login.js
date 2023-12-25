import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import authService from "../services/authServices";
import { useDispatch } from "react-redux";
import accountsSlices from "../redux/accountsSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CLIENT_ID =
    "795154931381-npgldkbjojtham774jbh1193sji0d6fi.apps.googleusercontent.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const isSignedIn = await authService.signIn(data);
    if (isSignedIn) {
      // console.log("signIn info: ", isSignedIn);
      dispatch(accountsSlices.actions.setAccount(isSignedIn));
      // localStorage.setItem("account", JSON.stringify(isSignedIn));
      navigate("/dashboard");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  useEffect(() => {
    console.log(CLIENT_ID);
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/userinfo.profile",
      });
    }
    gapi.load("client:auth2", start);
  });

  const onSuccess = async (res) => {
    console.log(res.profileObj);
    const data = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    const isSignedIn = await authService.signIn(data);
    if (isSignedIn) {
      // console.log(isSignedIn);
      dispatch(accountsSlices.actions.setAccount(isSignedIn));
      // localStorage.setItem("account", JSON.stringify(isSignedIn));
      navigate("/dashboard");
    } else {
      // alert("Sai tài khoản hoặc mật khẩu!");
    }
  };
  const onFailure = (res) => {
    alert("Sai tài khoản hoặc mật khẩu!");
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", position: "relative" }}
    >
      <CssBaseline />
      <Box
        component="div"
        sx={{
          background: "url(https://images.unsplash.com/photo-1561344640-2453889cde5b?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Box}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the opacity as needed
          borderRadius: "8px",
          margin: "auto",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            mt: 1,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LoginRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "80%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
