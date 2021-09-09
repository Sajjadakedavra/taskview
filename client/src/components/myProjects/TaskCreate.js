import { Button, InputLabel, TextField, Card, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

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

const TaskCreate = () => {
  const [createSelected, setCreateSelected] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [tasksCount, setTasksCount] = useState(1);

  const isAuthenticatedVal = useSelector(state => state.auth);

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
        <DatePicker
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
            <TextField variant="outlined" size="small" placeholder="Name" />
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
        <Button
          onClick={() => { }}
          color="primary"
          style={{ alignSelf: "flex-end", marginRight: 16 }}
        >
          Next
        </Button>
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
      {createSelected && <CreateView />}
      {!createSelected && <OpenView />}
    </Card>
  );
};

export default TaskCreate;
