import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Logo = ({ onClick, variant }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Box onClick={onClick}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, cursor: 'pointer', '& span': { color: variant === 'primary' ? 'white' : 'unset' } }}
        onClick={handleClick}
      >
        Thesis<span>project</span>
      </Typography>
    </Box>
  )
}

export default Logo;