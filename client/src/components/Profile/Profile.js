import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ProfileCard from "./ProfileCard/ProfileCard";
import SettingsCard from "./SettingsCard/SettingsCard";

// APP
export default function Profile() {

  return (
    <Box>
         <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden", minHeight:'1400px' }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "100%",
                height: "35vh",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative"
              }}
              src="https://iris2.gettimely.com/images/default-cover-image.jpg"
            />
          </Grid>

          {/* COMPONENTS */}
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{
                height:'70%',
                position: "absolute",
                top: "20vh",
                px: { xs: 0, md: 7 }
            }}
          >
            {/* PROFILE CARD */}
            <Grid item md={3}>
              <ProfileCard></ProfileCard>
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              <SettingsCard></SettingsCard>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </Box>
     
  );
}
