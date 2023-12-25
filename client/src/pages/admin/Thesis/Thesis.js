import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ToastMessage from "../../../components/ToastMessage/ToastMessage";
import majorService from "../../../services/majorService";
import userService from "../../../services/userServices";
import thesisService from "../../../services/thesisService";
import FormThesis from "./FormThesis";

export default function Thesis() {
  const columns = [
    // { field: 'facultyId', headerName: 'Faculty ID', width: 100 },
    {
      field: "title",
      headerName: "Name of Topic",
      width: 300,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "adviser",
      headerName: "Adviser",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}>
          {params.row.adviser.firstName + " " + params.row.adviser.lastName}
        </Box>
      ),
    },
    {
      field: "remarks",
      marginLeft: "30px",
      headerName: "Remark",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ color: "black" }}
            aria-label="edit"
            onClick={() => handleEdit(params.row._id)}
          >
            <EditNoteIcon />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            aria-label="delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");
  const [theses, setTheses] = React.useState([]);
  const [formType, setFormType] = React.useState("");
  const [sId, setSId] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    async function fetchThesis() {
      const listThesis = await thesisService.getAllThesis();
      setTheses(listThesis);
    }
    fetchThesis();
  }, [showForm]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = async () => {
    await setFormType("create");
    setShowForm(true);
  };
  const handleEdit = async (id) => {
    await setFormType("edit");
    setSId(id);
    setShowForm(true);
    console.log("Edit clicked for row with id:", id);
  };
  const handleDelete = async (id) => {
    const respone = await thesisService.deleteThesis(id);
    console.log(respone);
    if (respone.status === 204) {
      setMessage("Xóa thesis thành công");
      setTypeMessage("success");
      setTimeout(() => {
        setMessage("");
        setTypeMessage("");
      }, 3000);
      const updatedTheses = theses.filter((thesis) => thesis._id !== id);
      setTheses(updatedTheses);
    } else {
      setMessage("Xóa thesis thất bại");
      setTypeMessage("error");
    }
  };
  return (
    <Box>
      <ToastMessage message={message} type={typeMessage} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
            Theses
          </Typography>
          <Stack spacing={1} direction="row">
            <Button sx={{ fontSize: "1rem", textTransform: "none" }}>
              <UploadIcon sx={{ mr: 1 }} />
              Import
            </Button>
            <Button sx={{ fontSize: "1rem", textTransform: "none" }}>
              <DownloadIcon sx={{ mr: 1 }} />
              Export
            </Button>
          </Stack>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            fontSize: "1rem",
            borderRadius: 2.5,
            textTransform: "capitalize",
          }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>

      <Box
        sx={{
          height: 400,
          width: "100%",
          color: "black",
          backgroundColor: "white",
          ".MuiDataGrid-columnHeaderTitle": {
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
          },
          ".MuiDataGrid-cellContent": {
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
          },
        }}
      >
        <DataGrid
          rows={theses}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {showForm && (
        <FormThesis handleClose={handleCloseForm} type={formType} id={sId} />
      )}
    </Box>
  );
}
