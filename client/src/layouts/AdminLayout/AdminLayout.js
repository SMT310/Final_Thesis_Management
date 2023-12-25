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
          backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0IBwcHBw0IBwcHBw0HBwcHCA8IDQcNFREWFhURExMYHSggGCYlGxUfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDysZFRkrKzcrLS03LS0tLSsrKzcrKystLSsrKysrKysrKysrKy0rLSsrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAABAAIDBQQG/8QAFhABAQEAAAAAAAAAAAAAAAAAABEB/8QAGgEBAQEBAQEBAAAAAAAAAAAAAQACBAUDBv/EABcRAQEBAQAAAAAAAAAAAAAAAAARARL/2gAMAwEAAhEDEQA/AP2GYY1DH6Cvx/TMUaigqrKjUUQrMRiJrKaCVCKiNAjQRoRRVCIRoRSVCKRoRSNSSSqSSVSSRqUKSrMUaCNZiKJ6do1DDHyrkZgjcEVTMUagKrKKSrKKKrKaCVAaCNAaRNZRSVCKRoRSNCKRoRSVCKRoRSVQKSoRSNZRRNfVDGoo+FfCMRRqKGpiCNRQ1liBuCEMhpJMwNAoBoJUIgmhFJUJJGhFI0IpKhFFqhFJUFIGpJI1ApKskop90EbijnqjEEbghrO4xBG4Nw1mOcEbghrO4zBGtwQ0MhuCEMhqBBkNRFMopIJIlJJGhFI1JJGpRJGoFJUFJFJFGslJKvSgjcEctfaMQbje4Nw1ncYgje4I1WNxiDcbghrO45wR0ghrMc4o3GdwsxmCNxncNEZgbgNDCaiSZDUEKCMSQSKIUKRCKRCKRCKSCMSIRiRepBG4o5K7I5wRvcG4WNxiCNwQ1jcY3BG4Nw1ncYgjcG4WNxiMx0jO41WdxiCNwQsxiKNQQsxmBvcZhAgjUCTKKhASSKSSKSSKSSKSKIRSIRST1oI3BHHXo7jMZje4IazuMQbjcG4axuMCNwbjTG4xBGoNwsbjG4I3BDWNxiCNwQs7jEDcELMYijUBZjIjShEYgbgiEZDUUKZTQRCKRCKRBRRCKRCRSexBG4I4nqxiDcbg3DWdxiCNwbhY3GNwRsbjTG457gjcENY3GII3BuGsbjEG43BDWdxiCNwbhrG4xBG4IazGII3BDRGYI3BDRGIo1BEIzE1BCozFGkjGUSiEUiEQkEUU9uCNJwPZjEG43BuGs7jEZ3HSMxpjcYgb3BuGsbjA3G4CxuMbgbghY3GII3AWdxjcEbghrG4xBG4IazuMQRuCGsxiKNQQiMwRuCIRmCNRQ1RkRqKFRlNKJMpqJFlGLUmCQU9yKNROB7cZgaUQ3HPcG43BuNMbjEG43uMwsbjO4y3uDcLG4xob3BCxuMQRsQs7jAjcBY3GIo0IWYzA1uCGsxmCNwQ1mMCNwQiMwRqIiMxQxRKMxNKIxlRpRKMwa0NK1hNAsveUKee90RmOkG4qo5wbjpuM7jVZ3HPcEdNxncNY3GIGtwNMbjO4I1ohY3GII2NwsbjA3GwWdxiJoQsbjIjUUIjETQiZjMEaghEZijUEIjMTUSEZgjURMZTUCTOs63rOlnWUk0w93NaoTz3uZpqoSNQ1JLWRqTTGs6AixoBTTGshIsDQkWNASLOhJFkBIs6AkgkEQkklRUkRRRupEbrO6zupHHz3WKkmnzr/2Q==')`,
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
