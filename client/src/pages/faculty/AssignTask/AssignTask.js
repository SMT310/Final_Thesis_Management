import CardThesis from "../../../components/CardThesis/CardThesis";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import AddTaskForm from "../../../components/Form/AddTaskForm";
import thesisService from "../../../services/thesisService";
import taskService from "../../../services/taskService";
import Typography from "@mui/material/Typography";

function AssignTask() {
  const { id } = useParams();
  const [thesis, setThesis] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = async () => {
    setShowForm(true);
  };

  useEffect(() => {
    async function fetchData() {
      const thesis = await thesisService.getThesisById(id);
      if (thesis) {
        console.log("thesis: ", thesis);
        setThesis(thesis);
      }
      const tasks = await taskService.getTaskByThesisId(id);
      console.log("tasks: ", tasks);
      if (tasks) {
        setTasks(tasks);
      }
    }
    fetchData();
  }, [showForm]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          Back
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          Add Task
        </Button>
      </Box>
      {showForm && <AddTaskForm handleClose={handleCloseForm} thesis={id} />}

      {thesis && <CardThesis data={thesis} />}
      {/* Show list task */}
      <List
        sx={{
          width: "100%",
        //   maxWidth: 360,
          bgcolor: "background.paper",
          mt: 2,
        }}
        aria-label="contacts"
      >
        <Typography>Task:</Typography>

        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <ListItem disablePadding>
              <ListItemButton key={task._id}>
                <ListItemText primary={(index+1) + ") " + task.description} />
                <Typography>{task.status}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}

export default AssignTask;
