import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ToastMessage from "../ToastMessage/ToastMessage";
import taskService from "../../services/taskService";
import dayjs from "dayjs";

function AddTaskForm({ handleClose, thesis }) {
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [user, setUser] = useState(
    localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : {}
  );
  const today = dayjs();
  const [description, setDescription] = useState({ value: "", message: "" });
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(startDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      thesis: thesis,
      description: description.value,
      startDate: startDate,
      endDate: endDate,
      createdBy: user._id,
    };

    const respone = await taskService.createTask(data);
    console.log(("task: ", respone));
    // call api to create new user
    if (respone.status === 201) {
      setMessage("Tạo Task thành công");
      setTypeMessage("success");
      setDescription({ value: "", message: "" });
      setStartDate(null);
      setEndDate(null);
    } else {
      setMessage("Tạo Task thất bại");
      setTypeMessage("error");
    }

    setTimeout(() => {
      setMessage("");
      setTypeMessage("");
    }, 3000);
  };

  return (
    <Box>
      <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{"New Task"}</DialogTitle>
          <DialogContent sx={{ width: "600px", backgroundColor:'#dccaca' }}>
            <ToastMessage message={message} type={typeMessage} />
            <Box>
              <TextField
                label="Description"
                required
                value={description.value}
                variant="outlined"
                placeholder="Enter Last Name"
                sx={{ width: "100%", mb: 2 }}
                onChange={(e) =>
                  setDescription({ ...description, value: e.target.value })
                }
              />
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={today}
                label="Select Start Date"
                value={startDate}
                onChange={(newDay) => setStartDate(newDay)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={startDate}
                label="Select End Date"
                value={endDate}
                onChange={(newDay) => setEndDate(newDay)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default AddTaskForm;
