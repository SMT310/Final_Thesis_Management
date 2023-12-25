import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ThesisCardItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`${id}`);
  };

  return (
    <Box
      sx={{
        px: 1.5,
        py: 5,
        '&:hover': { cursor: 'pointer' },

      }}
      onClick={() => handleClick(item._id)}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
          },
          height: '100%', // Set the height to 100% to ensure equal heights
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            height: 200, // Fixed height for the image
            mb: 2,
            ml: 4
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/5097/5097510.png" width={'70%'} height={'90%'} alt={item.title} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontSize: '1.4rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              '&:hover': { cursor: 'pointer' },
            }}
            onClick={() => handleClick(item._id)}
          >
            <strong>{item.title}</strong>
          </Typography>
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>{item.authors.length > 0 ? `${item.authors[0].firstName} ${item.authors[0].lastName || ''}` : 'chưa có tác giả'}</Typography>
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>{item.adviser?.firstName} {item.adviser?.lastName}</Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}

          >
            {item.description}
          </Typography>

          <Box sx={{ '& img': { height: 26 } }}>
            <Typography>{item.major.name}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThesisCardItem;
