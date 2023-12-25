import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../services/userServices";

function FacultyDetail() {
  const { id } = useParams();
  const [faculty, setFaculty] = React.useState({});
  React.useEffect(() => {
    async function fetchFaculty() {
      const data = await userService.getUserById(id);
      setFaculty(data);
    }
    fetchFaculty();
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 24 }}>
      <Box
        sx={{
          lineHeight: 0,
          overflow: "hidden",
          borderRadius: 3,
          height: 200, // Fixed height for the image
          mb: 2,
        }}
      >
        <img
          src="https://faculty.ai/wp-content/uploads/2023/01/About-us-header.jpg"
          width={300}
          height={300}
          alt={"Faculty"}
        />
      </Box>
      <Box>
        <Typography sx={{ mb: 1, ml: 12 }}>
          <strong>First Name:</strong> {faculty.firstName}
        </Typography>
        <Typography sx={{ mb: 1, ml: 12 }}>
          <strong>Last Name:</strong> {faculty.lastName}
        </Typography>
        <Typography sx={{ mb: 1, ml: 12 }}>
          <strong>Email: </strong>
          {faculty.email}
        </Typography>
        <Typography sx={{ mb: 1, ml: 12 }}>
          <strong>Phone: </strong>
          {faculty.phone}
        </Typography>
        <Typography sx={{ mb: 1, ml: 12 }}>
          <strong>Address: </strong>
          {faculty.address}
        </Typography>
      </Box>
    </Box>
  );
}

export default FacultyDetail;
