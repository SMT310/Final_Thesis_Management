import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import userService from "../../services/userServices";
import majorService from "../../services/majorService";
import thesisService from "../../services/thesisService";

export default function RegisterThesisForm() {
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [majors, setMajors] = React.useState([]);
  const [major, setMajor] = React.useState(
    JSON.parse(localStorage.getItem("account")).major
  );
  const [students, setStudents] = React.useState([]);
  const [firstStudent, setFirstStudent] = React.useState("");
  const [secondStudent, setSecondStudent] = React.useState("");
  const [faculty, setFaculty] = React.useState(
    JSON.parse(localStorage.getItem("account"))
  );
  const [faculties, setFaculties] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const students = await userService.getAllStudent();
      const faculties = await userService.getAllFaculty();
      const majors = await majorService.getAllMajor();
      setStudents(students);
      setFaculties(faculties);
      setMajors(majors);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authors = [];
    if (firstStudent) {
      authors.push(firstStudent);
    } else if (secondStudent) {
      authors.push(secondStudent);
    }
    const data = {
      title: title,
      description: description,
      major: major,
      authors: authors,
      adviser: faculty._id,
      startDate: startDate,
      endDate: endDate,
    };



    const respone = await thesisService.registerThesis(faculty._id, data);
    console.log(respone);
    // call api to create new user
    if (respone) {
      setMessage("Đăng kí thesis thành công");
      setTypeMessage("success");
      setTitle("");
      setDescription("");
      setFirstStudent(null);
      setSecondStudent(null);
      setStartDate(null);
      setEndDate(null);
    } else {
      setMessage("Đăng kí thesis thất bại");
      setTypeMessage("error");
    }

    setTimeout(() => {
      setMessage("");
      setTypeMessage("");
    }, 3000);
  };

  return (
    <Box >
      <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
        Register Thesis
      </Typography>
      {/* sx={{ backgroundColor:'#dccaca'}} */}
      <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4,  backgroundColor:'#dccaca' }}>
        <ToastMessage message={message} type={typeMessage} />
        <form onSubmit={handleSubmit}>
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
              disabled
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
              value={faculty._id}
              disabled
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

          <Box sx={{ mt: 2, mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ mr: 6, width: "40%" }}
                label="Select Start Date"
                value={startDate}
                onChange={(newDay) => setStartDate(newDay)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select End Date"
                sx={{ width: "40%" }}
                value={endDate}
                onChange={(newDay) => setEndDate(newDay)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={() => {
                  // navigate to manage thesis page
                }}
              >
                Cancel
              </Button>

              <Button type="submit">Register</Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
