import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Box, Container } from "@mui/material";

function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/top-view-abstract-paper-texture-background_225709-2718.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <Header/> */}
      <Sidebar />
      <Box
        sx={{
          padding: "64px 0px 640px 240px",
          width: "100%",
          overflow: "auto",
          backgroundImage: `url('https://img.freepik.com/premium-photo/top-view-abstract-paper-texture-background_225709-2718.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container sx={{ paddingTop: "64px", margin: 0 }} maxWidth="false">
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLayout;
