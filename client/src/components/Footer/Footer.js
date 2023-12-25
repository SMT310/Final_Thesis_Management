import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import FooterNavigation from './FooterNavigation'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#00558d',
        py: { xs: 2, md: 2 },
        color: 'primary.contrastText',
      }}
    >
      <Container>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={5} container alignItems="center">
            <Grid item>
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE.png"
                style={{ width: '100%', maxWidth: 100, marginRight: 1 }}
              />
            </Grid>
            <Grid item>
              <Box sx={{ width: { xs: '100%', md: 560 }, mb: { xs: 3, md: 2 } }}>
                <Typography component="h4" variant="h4" sx={{ mb: 2, fontWeight: 600, marginTop: 1, marginLeft: 3 }}>
                  Thesis Management Final Project
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7}>
            <FooterNavigation />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer