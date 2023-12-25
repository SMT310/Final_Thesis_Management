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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import userService from "../../services/userServices";
import majorService from "../../services/majorService";

export default function UserSubmitForm({
  handleClose,
  id,
  type,
  actions,
  title,
}) {
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("");
  const [user, setUser] = React.useState({});

  const [userId, setUserId] = React.useState({
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
  const validateId = () => {
    const idValue = userId.value;

    // Check if the ID contains special characters or is not a letter
    const hasSpecialCharacters = /[^a-zA-Z\d]/.test(idValue);

    // Check if the ID length is not more than 5 characters
    const isTooLong = idValue.length > 10;

    if (hasSpecialCharacters) {
      setUserId((prevId) => ({
        ...prevId,
        message: "ID không được chứa kí đặc biệt",
      }));
    } else if (idValue.trim() === "") {
      setUserId((prevId) => ({
        ...prevId,
        message: "Vui lòng nhập Student ID",
      }));
    } else if (isTooLong) {
      setUserId((prevId) => ({
        ...prevId,
        message: "ID không được quá 10 kí tự",
      }));
    } else {
      setUserId((prevId) => ({
        ...prevId,
        message: "",
      }));
    }
  };

  const specialCharRegexForFLName = /[\d!@#$%^&*()_+={};':"\\|,.<>/?`~]+/;

  const validateFName = () => {
    if (/\d/.test(firstName.value)) {
      setFirstName({
        ...firstName,
        message: "Không Được Tồn Tại Số Trong Tên!",
      });
      return false;
    } else if (specialCharRegexForFLName.test(firstName.value)) {
      setFirstName({
        ...firstName,
        message: "Không Được Tồn Tại Kí Tự Đặc Biệt Trong Tên!",
      });
      return false;
    } else if (firstName.value.trim() === "") {
      setFirstName({
        ...firstName,
        message: "Vui lòng nhập first name",
      });
      return false;
    }
    setFirstName({
      ...firstName,
      message: "",
    });
    return true;
  };

  const validateLName = () => {
    if (/\d/.test(lastName.value)) {
      setLastName({
        ...lastName,
        message: "Không Được Tồn Tại Số Trong Tên!",
      });
      return false;
    } else if (specialCharRegexForFLName.test(lastName.value)) {
      setLastName({
        ...lastName,
        message: "Không Được Tồn Tại Kí Tự Đặc Biệt Trong Tên!",
      });
      return false;
    } else if (lastName.value.trim() === "") {
      setLastName({
        ...lastName,
        message: "Vui lòng nhập first name",
      });
      return false;
    }
    setLastName({
      ...lastName,
      message: "",
    });
    return true;
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
    const phoneValue = phone.value;

    // Check if the phone number contains special characters
    const hasSpecialCharacters = /[^\d]/.test(phoneValue);

    if (phoneValue === "") {
      setPhone({
        ...phone,
        message: "",
      });
    } else if (hasSpecialCharacters) {
      setPhone({
        ...phone,
        message: "Phone Number không chứa kí tự đặc biệt",
      });
    } else if (phoneValue.length === 10) {
      setPhone({
        ...phone,
        message: "",
      });
    } else {
      setPhone({
        ...phone,
        message: "Phone Number phải có độ dài 10 số",
      });
    }
  };

  const validateEmail = () => {
    if (email.value.trim() === "") {
      // empty
      setEmail({
        ...email,
        message: "Please enter an email address.",
      });
      return false;
    } else {
      let validEmail = email.value
        .toLowerCase()
        .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); // @ and .
      if (validEmail) {
        // Additional check for Gmail
        if (email.value.toLowerCase().endsWith("@gmail.com")) {
          setEmail({
            ...email,
            message: "",
          });
          return true;
        } else {
          setEmail({
            ...email,
            message: "Must includes @gmail.com in your email",
          });
          return false;
        }
      } else {
        setEmail({
          ...email,
          message:
            "Invalid email address. Email does not contain special characters",
        });
        return false;
      }
    }
  };

  // end section validation data

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
    async function fetchUser() {
      const majors = await majorService.getAllMajor();
      setMajors(majors);
      if (actions === "edit") {
        const user = await userService.getUserById(id);
        setUser(user);
        setUserId({
          value: user.studentId ? user.studentId : user.facultyId || "",
          message: "",
        });
        setFirstName({ value: user.firstName || "", message: "" });
        setLastName({ value: user.lastName || "", message: "" });
        setEmail({ value: user.email || "", message: "" });
        setPassword({ value: user.password || "", message: "" });
        setAddress({ value: user.address || "", message: "" });
        setPhone({ value: user.phone || "", message: "" });
        setBirthday(dayjs(user.birthday));
        setMajor({ value: user.major || "", message: "" });
      }
    }
    fetchUser();
  }, []);

  // submit form actions

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isOver80YearsOld = birthday && dayjs().diff(birthday, "years") > 80;
    const isUnder18YearsOld = birthday && dayjs().diff(birthday, "years") < 18;
    if (isOver80YearsOld && isUnder18YearsOld && !message) {
      setMessage("Vui lòng kiểm tra lại tuổi 1");
      setTypeMessage("warning");
    }

    if (!checkError() && !isOver80YearsOld && !isUnder18YearsOld) {
      const userType = type === "student" ? "student" : "faculty";
      const idField = type === "student" ? "studentId" : "facultyId";
      // Calculate age based on selected birth date
      // Check if the person is over 80 years old based on the selected birthday

      const data = {
        [idField]: userId.value,
        type: userType,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        address: address.value,
        phone: phone.value,
        birthday: birthday,
        major: major.value,
      };
      if (actions === "create") {
        const respone = await userService.createUser(data);
        // call api to create new user
        if (respone.status === 201) {
          setMessage("Tạo user thành công");
          setTypeMessage("success");
          setFirstName({ value: "", message: "" });
          setLastName({ value: "", message: "" });
          setEmail({ value: "", message: "" });
          setPassword({ value: "", message: "" });
          setAddress({ value: "", message: "" });
          setPhone({ value: "", message: "" });
          setBirthday(null);
          setUserId({ value: "", message: "" });
          setMajor({ value: "", message: "" });
        } else {
          setMessage("Tạo user thất bại");
          setTypeMessage("error");
        }
      } else {
        const respone = await userService.updateUser(id, data);
        if (respone.status === 200) {
          setMessage("Update user thành công");
          setTypeMessage("success");
        } else {
          setMessage("Update user thất bại");
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
    }, 3000);
  };

  return (
    <Box>
      <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          {/* <DialogTitle>{type === 'create' ?'Add New Student':'Update Student'}</DialogTitle> */}
          <DialogTitle
            sx={{ backgroundColor:'#dccaca'}}
          >
            {title}
          </DialogTitle>
          <DialogContent
            sx={{
              width: "600px",
              backgroundColor:'#dccaca'
            }}
          >
            <ToastMessage message={message} type={typeMessage} />
            <Box>
              <TextField
                
                label="ID"
                
                required
                value={userId.value}
                error={userId.message ? true : false}
                variant="outlined"
                placeholder="Enter ID"
                sx={{ width: "100%", mt: 1, color: "#fff"  }}
                onBlur={validateId}
                onChange={(e) =>
                  setUserId({ ...userId, value: e.target.value })
                }
                
              
              />
              <FormHelperText sx={{ mb: 2 }} error>
                {userId.message}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
              
                label="First Name"
                required
                value={firstName.value}
                error={firstName.message ? true : false}
                variant="outlined"
                placeholder="Enter First Name"
                sx={{ width: "100%" }}
                // onBlur={() =>

                //     validateFirstNameNumber()
                // }
                onBlur={validateFName}
                onChange={(e) =>
                  setFirstName({ ...firstName, value: e.target.value })
                }
              />
              <FormHelperText error sx={{ mb: 2 }}>
                {firstName.message}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
              
                label="Last Name"
                required
                value={lastName.value}
                error={lastName.message ? true : false}
                variant="outlined"
                placeholder="Enter Last Name"
                sx={{ width: "100%" }}
                onBlur={validateLName}
                onChange={(e) =>
                  setLastName({ ...lastName, value: e.target.value })
                }
              />
              <FormHelperText sx={{ mb: 2 }} error>
                {lastName.message}{" "}
              </FormHelperText>
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
                onChange={(e) => setEmail({ ...email, value: e.target.value })}
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
                onChange={(e) => setPhone({ ...phone, value: e.target.value })}
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
                sx={{ width: "100%" }}
                // onBlur={validateAddress}
                onChange={(e) =>
                  setAddress({ ...address, value: e.target.value })
                }
              />
              <FormHelperText error sx={{ mb: 2 }}>
                {address.message}
              </FormHelperText>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Birth Date"
                value={birthday}
                onChange={(newDay) => {
                  setBirthday(newDay);

                  // Check if the person is over 80 years old
                  const isOver80YearsOld = dayjs().diff(newDay, "years") > 80;
                  const isUnder18YearsOld = dayjs().diff(newDay, "years") < 18;
                  console.log("Lơn hơn tam muoi tủi? ", isOver80YearsOld);
                  // If over 80, show a message
                  if (isOver80YearsOld || isUnder18YearsOld) {
                    // You can set a state variable or display a message using a different mechanism
                    // console.log('Person is over 80 years old');
                    setMessage("Vui lòng kiểm tra lại tuổi!");
                    setTypeMessage("warning");
                  }
                }}
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
                onChange={(e) => setMajor({ ...major, value: e.target.value })}
              >
                {majors.length > 0 &&
                  majors.map((major) => (
                    <MenuItem value={major._id}>{major.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{ backgroundColor:'#dccaca'}}
          >
            <Button onClick={handleClose}>Cancel</Button>
            {actions === "create" ? (
              // (<Button type='submit'>Add</Button>) :
              // (<Button type='submit'>Update</Button>)
              <Button type="submit">Add</Button>
            ) : (
              <Button type="submit">Update</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
