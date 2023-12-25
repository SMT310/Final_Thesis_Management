import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ToastMessage from "../../../components/ToastMessage/ToastMessage";
import userService from "../../../services/userServices";
import majorService from "../../../services/majorService";
import thesisService from "../../../services/thesisService";

const listStatus = ["New", "Endorse", "Pass", "Fail"];
export default function FormThesis({ handleClose, id, type }) {
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");
  const [thesis, setThesis] = React.useState({});
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [majors, setMajors] = React.useState([]);
  const [major, setMajor] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [firstStudent, setFirstStudent] = React.useState("");
  const [secondStudent, setSecondStudent] = React.useState("");
  const [faculty, setFaculty] = React.useState("");
  const [reviewer, setReviewer] = React.useState("");
  const [faculties, setFaculties] = React.useState([]);
  const [remark, setRemark] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [defenseDate, setDefenseDate] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const students = await userService.getAllStudent();
      const faculties = await userService.getAllFaculty();
      const majors = await majorService.getAllMajor();
      setStudents(students);
      setFaculties(faculties);
      setMajors(majors);
      if (type === "edit") {
        const thesis = await thesisService.getThesisById(id);
        console.log("thesis: ", thesis);
        setThesis(thesis);
        setTitle(thesis.title);
        setDescription(thesis.description);
        setMajor(thesis.major?._id);
        setFirstStudent(thesis.authors[0]?._id);
        setSecondStudent(thesis.authors[1]?._id);
        setFaculty(thesis.adviser?._id);
        setReviewer(thesis.panelists[0]?._id);
        setRemark(thesis.remarks);
        setStatus(thesis.status);
        setStartDate(dayjs(thesis.startDate)); // Convert to Dayjs object
        setEndDate(dayjs(thesis.endDate));
        setDefenseDate(dayjs(thesis.defenseDate));
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      major: major,
      authors: [firstStudent, secondStudent],
      adviser: faculty,
      panelists: reviewer,
      remarks: remark,
      status: status,
      startDate: startDate,
      endDate: endDate,
      defenseDate: defenseDate,
    };
    if (type === "create") {
      const respone = await thesisService.createThesis(data);
      // call api to create new user
      if (respone.status === 201) {
        setMessage("Tạo thesis thành công");
        setTypeMessage("success");
        setTitle("");
        setDescription("");
        setMajor(null);
        setFirstStudent(null);
        setSecondStudent(null);
        setFaculty(null);
        setReviewer(null);
        setRemark("");
        setStatus("");
        setStartDate(null);
        setEndDate(null);
        setDefenseDate(null);
      } else {
        setMessage("Tạo thesis thất bại");
        setTypeMessage("error");
      }
    } else {
      const respone = await thesisService.updateThesis(id, data);
      if (respone.status === 200) {
        setMessage("Update thesis thành công");
        setTypeMessage("success");
      } else {
        setMessage("Update thesis thất bại");
        setTypeMessage("error");
      }
    }
    setTimeout(() => {
      setMessage("");
      setTypeMessage("");
      handleClose();
    }, 3000);
  };

  return (
    <Box sx={{backgroundImage:`url('')`}}>
      <React.Fragment>
        <Dialog open={true} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ backgroundColor:'#dccaca'}}>
              {type === "create" ? "Add New Thesis" : "Update Thesis"}
            </DialogTitle>
            <DialogContent sx={{ width: "600px", backgroundColor:'#dccaca' }}>
              <ToastMessage message={message} type={typeMessage} />

              <Box>
                <TextField
                  label="Title"
                  required
                  value={title}
                  variant="outlined"
                  placeholder="Enter Title"
                  sx={{ width: "100%", mb: 2, mt: 2 }}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box>
                <TextField
                  label="Description"
                  required
                  value={description}
                  variant="outlined"
                  placeholder="Enter Description"
                  sx={{ width: "100%", mb: 2 }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <FormControl sx={{ minWidth: "100%", mb: 2 }}>
                <InputLabel htmlFor="grouped-select">Major</InputLabel>
                <Select
                  value={major}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  label="Select Major"
                  onChange={(e) => setMajor(e.target.value)}
                >
                  {majors.length > 0 &&
                    majors.map((major) => (
                      <MenuItem value={major._id}>{major.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel htmlFor="grouped-select">Student 1</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      value={firstStudent}
                      label="Select First Student"
                      onChange={(e) => setFirstStudent(e.target.value)}
                    >
                      {/* <ListSubheader>Category 1</ListSubheader> */}
                      {students.length > 0 &&
                        students.map((student) => (
                          <MenuItem value={student._id}>
                            {student.firstName + " " + student.lastName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel htmlFor="grouped-select">Student 2</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      value={secondStudent}
                      label="Select Second Student"
                      onChange={(e) => setSecondStudent(e.target.value)}
                    >
                      {/* <ListSubheader>Category 1</ListSubheader> */}
                      {students.length > 0 &&
                        students.map((student) => (
                          <MenuItem value={student._id}>
                            {student.firstName + " " + student.lastName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl sx={{ minWidth: "100%", mb: 2 }}>
                <InputLabel htmlFor="grouped-select">Adviser</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={faculty}
                  label="Select Adviser"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  {/* <ListSubheader>Category 1</ListSubheader> */}
                  {faculties.length > 0 &&
                    faculties.map((faculty) => (
                      <MenuItem value={faculty._id}>
                        {faculty.firstName + " " + faculty.lastName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box>
                <TextField
                  label="Remark"
                  type="number"
                  required
                  value={remark}
                  variant="outlined"
                  placeholder="Enter Remark"
                  sx={{ width: "100%", mb: 2 }}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </Box>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel htmlFor="grouped-select">Status</InputLabel>
                <Select
                  value={status}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  label="Select Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {listStatus.map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mt: 2, mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ mr: 6 }}
                    label="Select Start Date"
                    value={startDate}
                    onChange={(newDay) => setStartDate(newDay)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select End Date"
                    value={endDate}
                    onChange={(newDay) => setEndDate(newDay)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Defense Date"
                  value={defenseDate}
                  onChange={(newDay) => setDefenseDate(newDay)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl sx={{ minWidth: "100%", mb: 2 }}>
                <InputLabel htmlFor="grouped-select">Reviewer</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={reviewer}
                  label="Select Reviewer"
                  onChange={(e) => setReviewer(e.target.value)}
                >
                  {/* <ListSubheader>Category 1</ListSubheader> */}
                  {faculties.length > 0 &&
                    faculties.map((faculty) => (
                      <MenuItem value={faculty._id}>
                        {faculty.firstName + " " + faculty.lastName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ backgroundColor:'#dccaca'}}>
              <Button onClick={handleClose}>Cancel</Button>
              {type === "create" ? (
                <Button type="submit">Add</Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </Box>
  );
}
