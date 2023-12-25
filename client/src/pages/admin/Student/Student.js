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
import userService from "../../../services/userServices";
import UserSubmitForm from "../../../components/Form/UserSubmitForm";

export default function Student() {
  const columns = [
    // { field: 'id', headerName: 'ID', width: 60 },
    { field: "studentId", headerName: "Student ID", width: 100 },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "major",
      headerName: "Major",
      width: 150,
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
  const [students, setStudents] = React.useState([]);
  const [formAction, setFormAction] = React.useState("");
  const [sId, setSId] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    async function fetchStudent() {
      const listStudent = await userService.getAllStudent();
      setStudents(listStudent);
    }
    fetchStudent();
  }, [showForm]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = () => {
    setFormAction("create");
    setTitle("Add New Student");
    setShowForm(true);
  };
  const handleEdit = (id) => {
    setFormAction("edit");
    setTitle("Update Student");
    setSId(id);
    setShowForm(true);
    console.log("Edit clicked for row with id:", id);
  };
  const handleDelete = async (id) => {
    const respone = await userService.deleteUser(id);
    console.log(respone);
    if (respone.status === 204) {
      setMessage("Xóa user thành công");
      setTypeMessage("success");
      setTimeout(() => {
        setMessage("");
        setTypeMessage("");
      }, 3000);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } else {
      setMessage("Xóa user thất bại");
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
            Students
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
          rows={students}
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
        <UserSubmitForm
          handleClose={handleCloseForm}
          actions={formAction}
          id={sId}
          title={title}
          type="student"
        />
      )}
    </Box>
  );
}
