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
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Popover } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateRange from "./DateRange";
import { createProject } from "../../store/action/project";

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

  const dispatch = useDispatch();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [tasksCount, setTasksCount] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  const dateValueObj = useSelector(state => state.date);

  const tasks = [
    {
      name: taskName,
      description: '',
      startDate: dateValueObj.date.startDateToUse,
      endDate: dateValueObj.date.endDateToUse
    }
  ];

  console.log(tasks);

  const createProjectAndReinitializeFields = () => {
    dispatch(createProject(projectName, tasks));
    setProjectName('');
    setTaskName('');
  }



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


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
            <TextField variant="outlined" size="small" placeholder="Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
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
              {/* <InputLabel style={{ margin: 8 }}>Due Date</InputLabel> */}
              <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>Date</InputLabel>

            </div>
            {/* <List disablePadding>
              {[...Array(tasksCount)].map((x, i) => (
                <TaskRow key={i} />
              ))}
            </List> */}
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
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <Button aria-describedby={id}
                onClick={handleClick}
                size="small"
              ><DateRangeIcon /></Button>
              {/* <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                size="small"
                format="MM/dd/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
              /> */}
            </div>
          </div>
          {/* <Button
            onClick={() => {
              setTasksCount(tasksCount + 1);
            }}
            style={{ alignSelf: "flex-start" }}
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Add a new Task
          </Button> */}
        </div>
        <Button onClick={() => { createProjectAndReinitializeFields() }} color="primary" size="small">
          Done
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <DateRange handleClose={handleClose} />
        </Popover>
      </div>
    </Card>
  );
};

export default NewProject;
