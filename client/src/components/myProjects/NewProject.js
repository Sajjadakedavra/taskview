import {
  Button,
  Card,
  IconButton,
  InputLabel,
  List,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useState } from "react";

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 500,
  },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 8,
  },
};

const NewProject = ({ handleClose }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [tasksCount, setTasksCount] = useState(1);

  const TaskRow = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          fullWidth={true}
          variant="outlined"
          size="small"
          placeholder="Name"
        />
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          size="small"
          format="MM/dd/yyyy"
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={(date) => handleDateChange(date)}
        />
      </div>
    );
  };

  return (
    <Card style={styles.cardContainer}>
      <div style={styles.contentContainer}>
        <div style={styles.projectBar}>
          <Typography>Create a new project</Typography>
          <IconButton
            style={{ color: "white" }}
            fontSize="small"
            onClick={handleClose}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </div>
        <div
          style={{
            padding: 16,
          }}
        >
          <div style={{ paddingTop: 8, paddingBottom: 24 }}>
            <InputLabel style={{ margin: 8 }}>Project</InputLabel>
            <TextField variant="outlined" size="small" placeholder="Name" />
          </div>
          <div style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 32,
              }}
            >
              <InputLabel style={{ margin: 8 }}>Task</InputLabel>
              <InputLabel style={{ margin: 8 }}>Due Date</InputLabel>
            </div>
            <List disablePadding>
              {[...Array(tasksCount)].map((x, i) => (
                <TaskRow key={i} />
              ))}
            </List>
          </div>
          <Button
            onClick={() => {
              setTasksCount(tasksCount + 1);
            }}
            style={{ alignSelf: "flex-start" }}
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Add a new Task
          </Button>
        </div>
        <Button onClick={() => { }} color="primary" size="small">
          Done
        </Button>
      </div>
    </Card>
  );
};

export default NewProject;
