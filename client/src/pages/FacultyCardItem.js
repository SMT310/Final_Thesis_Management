import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';

const FacultyCardItem = ({ item }) => {

  const navigate = useNavigate();

  const handlieClick = (id) => {
    console.log(id);
    navigate(`${id}`);
  }

  return (
    <Box
      sx={{
        px: 1.5,
        py: 5,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
            cursor:'pointer',
          },
        }}
        onClick={()=>handlieClick(item._id)}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            height: 200,
            mb: 2,
            
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/860/860454.png" width={'60%'} height={'80%'} alt={item.name} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="h4" 
          sx={{ fontSize: '1.4rem', '&:hover': { cursor:"pointer" }, }} 
          onClick={()=>handlieClick(item._id)}>
            {item.firstName + " " + item.lastName}
          </Typography>
          <Typography sx={{ mt: 2, mb: 2, color: 'text.secondary' }}>{item.email}</Typography>
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>{item.phone}</Typography>
          <Typography sx={{ mb: 2, color: 'text.secondary' }} variant="subtitle1">
            {item.isHeadDep? 'Head of Department': item.type}
          </Typography>
          {/* <Box sx={{ '& img': { height: 26 } }}>

            <Typography>{item.major}</Typography>
          </Box> */}
        </Box>
      </Box>
    </Box>
  )
}
export default FacultyCardItem