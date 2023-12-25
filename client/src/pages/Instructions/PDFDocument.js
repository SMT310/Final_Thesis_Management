import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: "50px",
  },
  section: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    color: "#3498db", // Blue color
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#555", // Dark gray color
  },
  note: {
    fontSize: 12,
    color: "#e74c3c", // Red color
  },
});

function PDFDocument() {
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.section}>
          {/* <Text><InstructionContent/></Text> */}
          <InstructionContent />
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;

const InstructionContent = () => {
  return (
    <>
      <Text style={styles.heading}>Usage Guide</Text>

      <View>
        <Text style={styles.text}>Welcome to the instruction page</Text>

        <Text style={styles.text}>
          This is the place where you will find all the necessary information to
          efficiently use our application.
        </Text>
      </View>

      <View>
        <Text style={styles.heading}>How to download the instruction file</Text>

        <Text style={styles.text}>
          To download the instruction file, simply click on the "Download"
          button on the instruction page.
        </Text>

        <Text style={styles.note}>
          Note: Ensure that you are logged in or access the page as a guest to
          have full access to the instruction document.
        </Text>
      </View>

      <View>
        <Text style={styles.heading}>Contact us</Text>

        <Text style={styles.text}>
          If you encounter any issues while using the application, please
          contact us at the following email address: luanTeamDev@gmail.dev.com.
        </Text>
      </View>
    </>
  );
};
