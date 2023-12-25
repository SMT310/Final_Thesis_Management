import React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import IconArrowForward from "@mui/icons-material/ArrowForward";
import { useTheme, styled } from "@mui/material/styles";
import ThesisCardItem from "./ThesisCardItem";
import "./Home.scss";
import thesisService from "../services/thesisService";

export const SliderArrow = (props) => {
  const { onClick, type, className } = props;
  return (
    <IconButton
      onClick={onClick}
      className={className}
      disableRipple
      sx={{
        color: "primary.main",
        position: "absolute",
        bottom: "-28px",
        right: 0,
        zIndex: 10,
      }}
    >
      {type === "next" ? (
        <IconArrowForward sx={{ fontSize: 22, right: 0 }} />
      ) : (
        <IconArrowBack sx={{ fontSize: 22, right: "60px" }} />
      )}
    </IconButton>
  );
};

export const StyledDots = styled("ul")(({ theme }) => ({
  "&.slick-dots": {
    position: "absolute",
    left: 0,
    bottom: -40,
    paddingLeft: theme.spacing(1),
    textAlign: "left",
    "& li": {
      marginRight: theme.spacing(2),
      "&.slick-active>div": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

function ListThesis() {
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("md"));
  const [theses, setTheses] = React.useState([]);

  React.useEffect(() => {
    async function fetchListThesis() {
      const listThesis = await thesisService.getDoneThesis();
      setTheses(listThesis);
    }
    fetchListThesis();
  }, []);

  const settings = {
    infinite: true,
    // autoplay: true,
    speed: 300,
    slidesToShow: matchMobileView ? 1 : theses.length < 3 ? theses.length : 3,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box
        sx={{
          height: 8,
          width: 30,
          backgroundColor: "divider",
          display: "inline-block",
          borderRadius: 4,
        }}
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
          {theses.length > 0 &&
            theses.map((item) => <ThesisCardItem key={item._id} item={item} />)}
        </Slider>
      </Container>
    </Box>
  );
}

export default ListThesis;
