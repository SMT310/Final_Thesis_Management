import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'

function AuthNavigation() {
    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate('/login')
    }
    return (
        <Box sx={{ '& button:first-child': { mr: 2 } }}>
        <Button disableHoverEffect={true} variant="outlined" onClick={handleSignIn} 
        sx={{
            backgroundColor: 'white', // Set the background color to white
            color: 'black', // Set the text color to black
            '&:hover': {
              backgroundColor: 'white', // Set the hover background color to white
              color: '#ff6600;', // Set the hover text color to black
              fontWeight:'bold',
              width:'150px'
            },
          }}>
            Sign In
        </Button>
        {/* <Button disableHoverEffect={true}>Sign Up</Button> */}
        </Box>
    )
}

export default AuthNavigation