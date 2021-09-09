import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  List,
  Card,
  Popover,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import NewProject from "./NewProject";

const data = [
  { id: 0, name: "Project 1", tasks: [{ id: 0, name: "Task 1" }] },
  {
    id: 1,
    name: "Project 2",
    tasks: [
      { id: 0, name: "Task 1" },
      { id: 1, name: "Task 2" },
    ],
  },
  {
    id: 2,
    name: "Project 3",
    tasks: [
      { id: 0, name: "Task 1" },
      { id: 1, name: "Task 2" },
      { id: 2, name: "Task 3" },
    ],
  },
];

const styles = {
  container: { display: "flex", flexDirection: "column", width: 300 },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
};

const SideView = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card style={styles.container}>
      <div style={styles.projectBar}>
        <Typography>Projects</Typography>
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          style={{ color: "white" }}
          fontSize="small"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
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
        <NewProject handleClose={handleClose} />
      </Popover>

      <List disablePadding>
        {data.map((project) => (
          <div>
            <Accordion square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{project.name}</Typography>
              </AccordionSummary>
              {project.tasks.map((task) => (
                <AccordionDetails>
                  <Typography style={{ paddingLeft: 4 }}>
                    {task.name}
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          </div>
        ))}
      </List>
    </Card>
  );
};

export default SideView;
