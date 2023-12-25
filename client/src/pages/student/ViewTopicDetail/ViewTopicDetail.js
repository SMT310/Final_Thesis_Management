import CardThesis from "../../../components/CardThesis/CardThesis";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import taskService from "../../../services/taskService";
import Typography from "@mui/material/Typography";
import thesisService from "../../../services/thesisService";
import SubmitTaskForm from "../../../components/Form/SubmitTaskForm";

function ViewTopicDetail({ type }) {
  const { id } = useParams();
  const [thesis, setThesis] = useState();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const handleCloseForm = () => {
    setShowForm(false);
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
      <Button
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        Back
      </Button>
      {thesis && <CardThesis data={thesis} />}

      {showForm && (
        <SubmitTaskForm handleClose={handleCloseForm} task={selectedTask} />
      )}

      {/* Show list task */}
      {type === "manage-thesis" && (
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
                <ListItemButton
                  key={task._id}
                  onClick={() => {
                    setSelectedTask(task._id);
                    if (task.status !== "done") setShowForm(true);
                  }}
                >
                  <ListItemText primary={index + 1 + ") " + task.description} />
                  <Typography>{task.status}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
}

export default ViewTopicDetail;
