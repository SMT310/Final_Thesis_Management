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
import FormMajor from "./FormMajor";
import majorService from "../../../services/majorService";

export default function Major() {
  const columns = [
    // { field: 'facultyId', headerName: 'Faculty ID', width: 100 },
    {
      field: "name",
      headerName: "Major Name",
      width: 300,
    },
    {
      field: "head",
      headerName: "Head of Major",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            sx={{ color: "black" }}
            onClick={() => handleEdit(params.row._id)}
          >
            <EditNoteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: "black" }}
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
  const [majors, setMajors] = React.useState([]);
  const [formType, setFormType] = React.useState("");
  const [sId, setSId] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    async function fetchMajor() {
      const listMajor = await majorService.getAllMajor();
      setMajors(listMajor);
    }
    fetchMajor();
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
    const respone = await majorService.deleteMajor(id);
    console.log(respone);
    if (respone.status === 204) {
      setMessage("Xóa major thành công");
      setTypeMessage("success");
      setTimeout(() => {
        setMessage("");
        setTypeMessage("");
      }, 3000);
      const updatedMajors = majors.filter((major) => major._id !== id);
      setMajors(updatedMajors);
    } else {
      setMessage("Xóa major thất bại");
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
            Majors
          </Typography>
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
          backgroundColor: "white",
          color: "black",
        }}
      >
        <DataGrid
          rows={majors}
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
        <FormMajor handleClose={handleCloseForm} type={formType} id={sId} />
      )}
    </Box>
  );
}
