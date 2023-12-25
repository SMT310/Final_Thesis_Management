import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

function Instruction() {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleConfirmDownload = () => {
    setOpenConfirmation(false);
    // Trigger the download link programmatically
    document.getElementById("download-link").click();
  };

  return (
    <Box>
      <Typography sx={{ textTransform: "capitalize", mb: 2 }}>
        Download the instruction file.
      </Typography>

      {/* Download Button */}
      <Button variant="contained" onClick={() => setOpenConfirmation(true)} sx={{mb: 2}}>
        Download
      </Button>

      {/* Download Confirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
      >
        <DialogTitle>Confirm Download</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to download the instruction file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDownload} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* PDF Download Link */}
      <PDFDownloadLink document={<PDFDocument />} fileName="Instruction.pdf">
        {({ blob, url, loading, error }) => (
          <a
            id="download-link"
            href={url}
            style={{ display: "none" }}
            download="Instruction.pdf"
          >
            Download Link
          </a>
        )}
      </PDFDownloadLink>

      {/* PDF Viewer */}
      <PDFViewer width={"100%"} height={"700px"}>
        <PDFDocument />
      </PDFViewer>
    </Box>
  );
}

export default Instruction;
