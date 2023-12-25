import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import FacultyCardItem from './FacultyCardItem';
import { SliderArrow, StyledDots } from './ListThesis';
import './Home.scss';
import userService from '../services/userServices';


function ListFaculty() {
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down('md'));
  const [faculties, setFaculties] = React.useState([]);

  React.useEffect(() => {
    async function fetchListFaculty() {
      const listFaculty = await userService.getAllFaculty();
      setFaculties(listFaculty);
    }
    fetchListFaculty();
  }, [])

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: matchMobileView ? 1 : (faculties.length < 3 ? faculties.length : 3),
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box
        sx={{ height: 8, width: 30, backgroundColor: 'divider', display: 'inline-block', borderRadius: 4 }}
      />
    ),
  };

  return (
    <Box
      id="mentors"
      sx={{
        // boxShadow: 4,
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

        pt: {
          xs: 6,
          md: 8,
        },
        pb: {
          xs: 8,
          md: 12,
        },
        borderRadius: "10px",
        backgroundColor: "#dfd694",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Slider {...settings}>
          {faculties.length > 0 && faculties.map((item) => (
            <FacultyCardItem key={item._id} item={item} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
}


export default ListFaculty