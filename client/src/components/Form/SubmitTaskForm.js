import Box from "@mui/material/Box";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ToastMessage from "../ToastMessage/ToastMessage";
import taskService from "../../services/taskService";
import UploadFile from "../Upload/UploadFile";
import { ref,  uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../Upload/FireBase';

function SubmitTaskForm({ handleClose, task }) {
  const [user, setUser] = useState(localStorage.getItem('account')?JSON.parse(localStorage.getItem('account')):{});
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploadProgress < 100) {
      setTypeMessage('warning');
      setMessage('File chưa upload thành công, vui lòng đợi hoàn tất quá trình để submit!');
      return
    }
    let files = [];
    files.push({
        name: file.name,
        path: downloadURL,
        submitter: user?._id
    })
    console.log(("submit files: ", files));

    const data = files;

    const respone = await taskService.submitTask(task, data);
    console.log(("submit task: ", respone));
    // chưa có api for submit files
    if (respone.status === 200) {
      setMessage("Submit Task thành công");
      setTypeMessage("success");
    } else {
      setMessage("Submit Task thất bại");
      setTypeMessage("error");
    }
    setTimeout(() => {
      setMessage("");
      setTypeMessage("");
    }, 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
        setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
        const storageRef = ref(storage, `file_uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Track the upload progress
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
            },
            (error) => {
              // Handle any errors during the upload
              console.log(error);
            },
            () => {
              // Handle the successful upload
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setDownloadURL(url);
              });
            }
        );
      
    }
  };
  return (
    <Box>
      <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{"Submit Task"}</DialogTitle>
          <DialogContent sx={{ width: "600px" }}>
            <ToastMessage message={message} type={typeMessage} />
            <Box>
              <UploadFile onUpload = {handleUpload} onChange= {handleFileChange}/>
              {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default SubmitTaskForm;
