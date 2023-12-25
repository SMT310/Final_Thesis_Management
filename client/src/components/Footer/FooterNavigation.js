import React from 'react'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import FooterSectionTitle from './FooterSectionTitle'
import { useLocation } from 'react-router-dom';


export const headerNavigations  = [
    {
      label: 'Home',
      path: '/', 
    },
    {
      label: 'Thesis',
      path: '/list-thesis',
    },
    {
      label: 'Faculty',
      path: '/list-faculty', 
    },
    {
      label: 'Instruction',
      path: '/instruction', 
    },
    // {
    //   label: 'Notifications',
    //   path: '/notifications', 
    // },
]


const pageMenu = headerNavigations

function NavigationItem({ label, path }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link href={path} passHref>
      <MuiLink
        underline="hover"
        sx={{
          display: 'block',
          mb: 1,
          color: isActive ? '#fd0000' : 'primary.contrastText',
          fontSize: '1.5rem',
          fontWeight: isActive ? 600 : 'inherit',
        }}
      >
        {label}
      </MuiLink>
    </Link>
  )
}

function FooterNavigation() {
  return (
    <Grid container spacing={2} justifyContent="flex-end">

      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Menu" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
    </Grid>
  )
}

export default FooterNavigation