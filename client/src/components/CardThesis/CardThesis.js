import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CardThesis({ data }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Title: {data.title}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description: {data.description}
        </Typography>
        <Typography variant="body2">Major: {data.major?.name}</Typography>
        <Typography variant="body2">
          Adviser: {data.adviser?.firstName + " " + data.adviser?.lastName}
        </Typography>
        <Typography variant="body2">
          Author 1 (Leader):{" "}
          {data.authors?.[0].firstName + " " + data.authors?.[0].lastName}
        </Typography>
        <Typography variant="body2">
          Author 2:{" "}
          {data.authors?.length > 1 &&
            data.authors[1]?.firstName + " " + data.authors[1]?.lastName}
        </Typography>
        <Typography variant="body2">
          Reviewer:{" "}
          {data.panelists?.length > 0 &&
            data.panelists?.[0].firstName + " " + data.panelists?.[0].lastName}
        </Typography>
      </CardContent>
    </Card>
  );
}
