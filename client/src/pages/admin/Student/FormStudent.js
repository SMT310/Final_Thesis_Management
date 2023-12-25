import * as React from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ToastMessage from "../../../components/ToastMessage/ToastMessage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userServices";
import majorService from "../../../services/majorService";

export default function FormStudent({ handleClose, id, type }) {
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");
  const [student, setStudent] = React.useState({});
  const [studentId, setStudentId] = React.useState({
    value: "",
    message: "",
  });
  const [firstName, setFirstName] = React.useState({
    value: "",
    message: "",
  });
  const [lastName, setLastName] = React.useState({
    value: "",
    message: "",
  });
  const [email, setEmail] = React.useState({
    value: "",
    message: "",
  });
  const [password, setPassword] = React.useState({
    value: "",
    message: "",
    isShow: false,
  });
  const [address, setAddress] = React.useState({
    value: "",
    message: "",
  });
  const [phone, setPhone] = React.useState({
    value: "",
    message: "",
  });
  const [birthday, setBirthday] = React.useState(null);
  const [majors, setMajors] = React.useState([]);
  const [major, setMajor] = React.useState({
    value: "",
    message: "",
  });
  const navigate = useNavigate();

  const validateFirstName = () => {
    if (firstName.value.trim() === "") {
      setFirstName({
        ...firstName,
        message: "Vui lòng nhập first name",
      });
    }
    setFirstName({ ...firstName, message: "" });
  };
  const validateLastName = () => {
    if (lastName.value.trim() === "") {
      setLastName({
        ...lastName,
        message: "Vui lòng nhập last name",
      });
    }
    setLastName({ ...lastName, message: "" });
  };
  const validateEmail = () => {
    if (email.value.trim() === "") {
      setEmail({
        ...email,
        message: "Vui lòng nhập email",
      });
    } else {
      let validEmail = email.value
        .toLowerCase()
        .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      if (validEmail) setEmail({ ...email, message: "" });
      else setEmail({ ...email, message: "Email không hợp lệ" });
    }
  };
  const validatePassword = () => {
    if (password.value === "") {
      setPassword({
        ...password,
        message: "Vui lòng nhập Password",
      });
    } else {
      if (password.value.length >= 6) setPassword({ ...password, message: "" });
      else
        setPassword({
          ...password,
          message: "Password phải từ 6 kí tự trở lên",
        });
    }
  };
  const validatePhone = () => {
    if (phone.value === "") {
      setPhone({
        ...phone,
        message: "",
      });
    } else {
      let validPhone = phone.value.match(/(0[3|5|7|8|9])+([0-9]{8})\b/g);
      if (validPhone) setPhone({ ...phone, message: "" });
      else setPhone({ ...phone, message: "Phone Number không hợp lệ" });
    }
  };

  const handleShowPassword = () => {
    setPassword({ ...password, isShow: !password.isShow });
  };

  const checkError = () => {
    if (
      firstName.message !== "" ||
      lastName.message !== "" ||
      password.message !== "" ||
      email.message !== "" ||
      phone.message !== ""
    ) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    async function fetchStudent() {
      const student = await userService.getUserById(id);
      setStudent(student);
      const majors = await majorService.getAllMajor();
      setMajors(majors);
      if (type === "edit") {
        setStudentId({ value: student.studentId || "", message: "" });
        setFirstName({ value: student.firstName || "", message: "" });
        setLastName({ value: student.lastName || "", message: "" });
        setEmail({ value: student.email || "", message: "" });
        setPassword({ value: student.password || "", message: "" });
        setAddress({ value: student.address || "", message: "" });
        setPhone({ value: student.phone || "", message: "" });
        setBirthday(dayjs(student.birthday));
        setMajor({ value: student.major || "", message: "" });
      }
    }
    fetchStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkError()) {
      const data = {
        studentId: studentId.value,
        type: "student",
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        address: address.value,
        phone: phone.value,
        birthday: birthday,
        major: major.value,
      };
      if (type === "create") {
        const respone = await userService.createUser(data);
        // call api to create new user
        if (respone.status === 201) {
          setMessage("Tạo student thành công");
          setTypeMessage("success");
          setFirstName({ value: "", message: "" });
          setLastName({ value: "", message: "" });
          setEmail({ value: "", message: "" });
          setPassword({ value: "", message: "" });
          setAddress({ value: "", message: "" });
          setPhone({ value: "", message: "" });
          setBirthday(null);
          setStudentId({ value: "", message: "" });
          setMajor({ value: "", message: "" });
        } else {
          setMessage("Tạo student thất bại");
          setTypeMessage("error");
        }
      } else {
        const respone = await userService.updateUser(id, data);
        if (respone.status === 200) {
          setMessage("Update student thành công");
          setTypeMessage("success");
        } else {
          setMessage("Update student thất bại");
          setTypeMessage("error");
        }
      }
    } else {
      setMessage("Vui lòng kiểm tra các trường đã nhập");
      setTypeMessage("error");
    }
    setTimeout(() => {
      setMessage("");
      setTypeMessage("");
      handleClose();
    }, 3000);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundRepeat: "none-repeat",
      }}
    >
      <React.Fragment >
        <Dialog open={true} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ backgroundColor:'#dccaca'}}>
              {type === "create" ? "Add New Student" : "Update Student"}
            </DialogTitle>
            <DialogContent sx={{ width: "600px" }}>
              <ToastMessage message={message} type={typeMessage} />
              <Box>
                <TextField
                  label="Student ID"
                  required
                  value={studentId.value}
                  error={studentId.message ? true : false}
                  variant="outlined"
                  placeholder="Enter Student ID"
                  sx={{ width: "100%", mb: 2, mt: 1 }}
                  onBlur={validateFirstName}
                  onChange={(e) =>
                    setStudentId({ ...studentId, value: e.target.value })
                  }
                />
                <FormHelperText error>{firstName.message}</FormHelperText>
              </Box>
              <Box>
                <TextField
                  label="First Name"
                  required
                  value={firstName.value}
                  error={firstName.message ? true : false}
                  variant="outlined"
                  placeholder="Enter First Name"
                  sx={{ width: "100%", mb: 2 }}
                  onBlur={validateFirstName}
                  onChange={(e) =>
                    setFirstName({ ...firstName, value: e.target.value })
                  }
                />
                <FormHelperText error>{firstName.message}</FormHelperText>
              </Box>
              <Box>
                <TextField
                  label="Last Name"
                  required
                  value={lastName.value}
                  error={lastName.message ? true : false}
                  variant="outlined"
                  placeholder="Enter Last Name"
                  sx={{ width: "100%", mb: 2 }}
                  onBlur={validateLastName}
                  onChange={(e) =>
                    setLastName({ ...lastName, value: e.target.value })
                  }
                />
                <FormHelperText error>{lastName.message}</FormHelperText>
              </Box>
              <Box>
                <TextField
                  label="Email"
                  required
                  sx={{ width: "100%" }}
                  value={email.value}
                  error={email.message ? true : false}
                  variant="outlined"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setEmail({ ...email, value: e.target.value })
                  }
                  onBlur={validateEmail}
                />
                <FormHelperText error sx={{ mb: 2 }}>
                  {email.message}
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  id="validation-outlined-input"
                  label="Password"
                  value={password.value}
                  error={password.message ? true : false}
                  required
                  sx={{ width: "100%" }}
                  type={password.isShow ? "text" : "password"}
                  variant="outlined"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    setPassword({ ...password, value: e.target.value })
                  }
                  onBlur={validatePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleShowPassword}>
                          {password.isShow ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText error sx={{ mb: 2 }}>
                  {password.message}
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  id="validation-outlined-input"
                  label="Phone Number"
                  value={phone.value}
                  error={phone.message ? true : false}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Phone Number"
                  onBlur={validatePhone}
                  onChange={(e) =>
                    setPhone({ ...phone, value: e.target.value })
                  }
                />
                <FormHelperText error sx={{ mb: 2 }}>
                  {phone.message}
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  label="Address"
                  value={address.value}
                  error={address.message ? true : false}
                  variant="outlined"
                  placeholder="Enter Address"
                  sx={{ width: "100%", mb: 2 }}
                  onChange={(e) =>
                    setAddress({ ...address, value: e.target.value })
                  }
                />
                <FormHelperText error>{address.message}</FormHelperText>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Birth Date"
                  value={birthday}
                  onChange={(newDay) => setBirthday(newDay)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl sx={{ minWidth: "100%", mt: 2 }}>
                <InputLabel htmlFor="grouped-select">Major</InputLabel>
                <Select
                  value={major.value}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  label="Select Status"
                  onChange={(e) =>
                    setMajor({ ...major, value: e.target.value })
                  }
                >
                  {majors.length > 0 &&
                    majors.map((major) => (
                      <MenuItem value={major._id}>{major.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
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
