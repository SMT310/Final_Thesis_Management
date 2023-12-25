import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export const navigations = [
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
];

function Navigation() {
  const [selectedLabel, setSelectedLabel] = useState('Home');

  const handleSelectLabel = (label) => {
    setSelectedLabel(label);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path: destination, label }) => (
        <Box
          component={Link}
          key={destination}
          to={destination}
          onClick={() => handleSelectLabel(label)}
          sx={{
            position: 'relative',
            color: selectedLabel === label ? '#ff6600' : 'white',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 0, md: 3 },
            mb: { xs: 3, md: 0 },
            fontSize: { xs: '1.2rem', md: 'inherit' },
            '&:hover': {
              color: '#ff6600;',
            },
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
}

export default Navigation;