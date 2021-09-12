import { Button, InputLabel, TextField, Card, List, Popover } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTime from "./DateTime";
import DateRangeIcon from '@material-ui/icons/DateRange';
import Login from "./Login";
import DateRange from "./DateRange";

import { createProject } from "../../store/action/project";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    width: 300,
  },
  contentContainer: {
    display: "flex",
    paddingTop: 24,
    justifyContent: "center",
    flexDirection: "column",
  },
};


/**
 * name ,
 * tasks :[
 * {
 *  name:"TASK NAME",
 *  startDate:"",
 *  dueDate:""
 * }]
 */

const TaskCreate = () => {

  const dispatch = useDispatch();

  const [createSelected, setCreateSelected] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  const dateValueObj = useSelector(state => state.date);
  const projectObj = useSelector(state => state.project);
  // console.log(projectObj);

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isAuthenticatedVal = useSelector(state => state.auth);


  const CreateView = () =>
    isAuthenticatedVal.isAuthenticated ? (
      <div style={styles.contentContainer}>
        <div
          style={{
            padding: 16,
            paddingTop: 0,
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
                paddingRight: 16,
              }}
            >
              <InputLabel style={{ margin: 8 }}>Task</InputLabel>
              {/* <InputLabel style={{ margin: 8 }}>Due Date</InputLabel> */}
              <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>Date</InputLabel>

            </div>
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
              <Button aria-describedby={id}
                onClick={handleClick}
                size="small"
              ><DateRangeIcon /></Button>
            </div>
          </div>
        </div>
        <Button
          onClick={() => { }}
          color="primary"
          style={{ alignSelf: "flex-end", marginRight: 16 }}
        >
          Next
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
    ) : (
      <Login />
    );

  const OpenView = () => (
    <div style={styles.contentContainer}>
      <div>
        <InputLabel style={{ marginBottom: 8 }}>Enter Link</InputLabel>
        <TextField id="link-textfield" variant="outlined" size="small" />
      </div>
      <Button
        style={{ marginTop: 8 }}
        onClick={() => { }}
        color="primary"
        size="small"
      >
        Open
      </Button>
    </div>
  );

  return (
    <Card style={styles.card}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant={createSelected ? "contained" : "outlined"}
          style={{ marginRight: 2, backgroundColor: createSelected ? "#042f66" : 'white', color: createSelected ? "white" : "#042f66" }}
          size="small"
          onClick={() => !createSelected && setCreateSelected(!createSelected)}
        >
          Create
        </Button>
        <Button
          variant={createSelected ? "outlined" : "contained"}
          size="small"
          style={{ backgroundColor: !createSelected ? "#042f66" : 'white', color: !createSelected ? "white" : "#042f66", marginLeft: 2 }}
          onClick={() => createSelected && setCreateSelected(!createSelected)}
        >
          Open
        </Button>
      </div>

      {createSelected && isAuthenticatedVal.isAuthenticated ? (
        <div style={styles.contentContainer}>
          <div
            style={{
              padding: 16,
              paddingTop: 0,
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
                  paddingRight: 16,
                }}
              >
                <InputLabel style={{ margin: 8 }}>Task</InputLabel>
                {/* <InputLabel style={{ margin: 8 }}>Due Date</InputLabel> */}
                <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>Date</InputLabel>

              </div>
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
              </div>
            </div>
          </div>
          <Button
            onClick={() => { createProjectAndReinitializeFields() }}
            color="primary"
            style={{ alignSelf: "flex-end", marginRight: 16 }}
          >
            Next
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
      ) : (
        <Login />
      )}
      {!createSelected && <OpenView />}
    </Card>
  );
};

export default TaskCreate;
