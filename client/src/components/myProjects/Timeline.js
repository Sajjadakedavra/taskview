import ScrollContainer from "react-indiana-drag-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import ModifyProject from "./ModifyProject";

const {
  AccordionSummary,
  Accordion,
  List,
  Typography,
  Popover,
  Button,
  ButtonBase,
} = require("@material-ui/core");

const data = [
  {
    id: 0,
    name: "Project 1",
    color: "royalblue",
    tasks: [
      {
        id: 0,
        name: "Task 1",
        startDate: moment("21-9-2021", "DD-MM-YYYY"),
        dueDate: moment("22-9-2021", "DD-MM-YYYY"),
      },
      {
        id: 1,
        name: "Task 2",
        startDate: moment("19-3-2021", "DD-MM-YYYY"),
        dueDate: moment("25-3-2021", "DD-MM-YYYY"),
      },
    ],
  },
  {
    id: 2,
    name: "Project 2",
    color: "pink",
    tasks: [
      {
        id: 0,
        name: "Task 1",
        startDate: moment("16-2-2021", "DD-MM-YYYY"),
        dueDate: moment("16-2-2021", "DD-MM-YYYY"),
      },
      {
        id: 1,
        name: "Task 2",
        startDate: moment("24-6-2021", "DD-MM-YYYY"),
        dueDate: moment("28-6-2021", "DD-MM-YYYY"),
      },
    ],
  },
];

const styles = {
  container: {
    padding: 24,
  },
  scrollContainer: {
    borderRadius: 8,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  accordion: {
    display: "flex",
    minHeight: 10,
    height: 30,
    borderTopLeftRadius: 8,
    marginTop: 1,
    marginBottom: 1,
    color: "white",
  },
  monthsListContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#042f66",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: "lightGrey",
    padding: 4,
    color: "white",
  },
  daysListContainer: {
    display: "flex",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "lightGrey",
    borderWidth: 1,
    marginBottom: 1,
    width: 60,
    padding: 8,
  },
  gridBoxContainer: {
    display: "flex",
    justifyContent: "center",
    borderStyle: "solid",

    borderWidth: 1,
    width: 60,
    padding: 8,
    marginTop: 1,
    marginBottom: 1,
  },
  taskContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 300,
    height: 40,
    marginTop: 1,
    marginBottom: 1,
  },
  taskText: {
    width: "60%",
    borderStyle: "solid",
    borderColor: "white",
    padding: 10,
    borderWidth: 1,
  },
};

const MonthTimeline = ({ projects }) => {
  const dateObject = useSelector((state) => state.date);
  console.log("----------- ", dateObject.date)
  const [anchorEl, setAnchorEl] = useState(null);

  const [project, setProject] = useState({});
  // console.log("project id to be sent as prop is: ", projectId);

  const handleClickAndSendProps = (event, project, index) => {
    handleClick(event);
    setProject({ ...project, index });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const startDate = dateObject.date.startDateToUse;
  const endDate = dateObject.date.endDateToUse;
  let referenceDate = moment(startDate).subtract(
    moment(startDate).get("date") - 1,
    "days"
  );
  let accordionWidth = 0;
  let monthsDiff = 0;

  (() => {
    let febCount = 0;
    let calDate = moment(startDate).subtract(
      moment(startDate).get("date") - 1,
      "days"
    );
    while (moment(endDate).isSameOrAfter(calDate)) {
      monthsDiff++;
      calDate.month() === 1 && febCount++;
      calDate.add(1, "months");
    }

    accordionWidth +=
      300 + (monthsDiff - febCount) * 5 * 78 + febCount * 4 * 78;
  })();

  const addMonthToRefDate = () => {
    referenceDate.add(1, "months");
  };

  const resetRefDate = () => {
    referenceDate = moment(startDate).subtract(
      moment(startDate).get("date") - 1,
      "days"
    );
  };

  return (
    <div style={styles.container}>
      <ScrollContainer
        style={styles.scrollContainer}
        horizontal={true}
        vertical={false}
      >
        <div>
          <div style={{ width: 300 }}></div>
          <div style={{ ...styles.flexRow, marginLeft: 300 }}>
            {[...Array(monthsDiff)].map((x, index) => (
              <div key={index}>
                <div
                  style={{
                    ...styles.monthsListContainer,
                    borderTopLeftRadius: index === 0 ? 8 : 0,
                    borderTopRightRadius: index === monthsDiff - 1 ? 8 : 0,
                  }}
                >
                  <Typography>{referenceDate.format("MMMM")}</Typography>
                </div>
                <List disablePadding style={styles.flexRow}>
                  {referenceDate.daysInMonth() > 28
                    ? [7, 14, 21, 28, referenceDate.daysInMonth()].map(
                      (day) => (
                        <div style={styles.daysListContainer}>
                          <div>
                            <Typography>{day}</Typography>
                          </div>
                        </div>
                      )
                    )
                    : [7, 14, 21, 28].map((day) => (
                      <div style={styles.daysListContainer}>
                        <div>
                          <Typography>{day}</Typography>
                        </div>
                      </div>
                    ))}
                </List>
                {addMonthToRefDate()}
              </div>
            ))}
          </div>
        </div>
        {resetRefDate()}
        <div>
          {projects.map((project) => (
            <div>
              {/* {setProjectId(project._id)} */}
              <Accordion
                style={{ width: accordionWidth }}
                square
                defaultExpanded={true}
                elevation={0}
              >
                <AccordionSummary
                  style={{
                    ...styles.accordion,
                    backgroundColor: project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low' && 'green'))) : "royalblue",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{project.name}</Typography>
                </AccordionSummary>
                {project.tasks.map((task, index) => (
                  <div style={styles.flexRow}>
                    <div style={styles.taskContainer}>
                      <Typography
                        style={{
                          ...styles.taskText,
                          borderBottomColor:
                            index === project.tasks.length - 1
                              ? "white"
                              : "lightGrey",
                        }}
                      >
                        {task.name}
                      </Typography>
                    </div>
                    {/** rendering boxes */}
                    <div style={styles.flexRow}>
                      {[...Array(monthsDiff)].map((x) => (
                        <div style={styles.flexRow}>
                          {[
                            ...Array(referenceDate.daysInMonth() > 28 ? 5 : 4),
                          ].map((x, i) => {
                            let compareResult = false;
                            let taskvalue = " ";

                            const strtDate = moment(task.startDate, "DD-MM-YYYY");
                            const dueDate = moment(task.endDate, "DD-MM-YYYY");
                            for (
                              let j = 0;
                              j < 7 &&
                              referenceDate.get("date") <
                              referenceDate.daysInMonth();
                              j++
                            ) {
                              referenceDate.isBetween(strtDate, dueDate) &&
                                (compareResult = true);

                              referenceDate.format("DD MM YYYY") ===
                                strtDate.format("DD MM YYYY") &&
                                (compareResult = true) &&
                                (taskvalue = strtDate.format("ddd DD"));
                              referenceDate.format("DD MM YYYY") ===
                                dueDate.format("DD MM YYYY") &&
                                (compareResult = true) &&
                                (taskvalue = dueDate.format("ddd DD"));

                              referenceDate.add(1, "days");
                            }

                            return (
                              <div
                                style={{
                                  ...styles.gridBoxContainer,
                                  borderColor: compareResult
                                    ? project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low') && 'green')) : "royalblue"
                                    : "lightGrey",
                                  backgroundColor: compareResult
                                    ? project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low') && 'green')) : "royalblue"
                                    : "#f5f5f5",
                                }}
                              >
                                {compareResult && (
                                  <ButtonBase
                                    aria-describedby={id}
                                    onClick={event => handleClickAndSendProps(event, project, index)}
                                    style={{ color: "white", width: 60 }}
                                  >
                                    {taskvalue}
                                  </ButtonBase>
                                )}
                                {/* {add7DaysToRefDate()} */}
                              </div>
                            );
                          })}
                          {(() => {
                            referenceDate.add(1, "days");
                          })()}
                        </div>
                      ))}
                    </div>
                    {resetRefDate()}
                  </div>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <ModifyProject handleClose={handleClose} project={project} />
        </Popover>
      </ScrollContainer>
    </div>
  );
};

const WeekTimeline = ({ projects }) => {
  const dateObject = useSelector((state) => state.date);
  const [anchorEl, setAnchorEl] = useState(null);

  const [project, setProject] = useState({});
  // console.log("project id to be sent as prop is: ", projectId);

  const handleClickAndSendProps = (event, project, index) => {
    handleClick(event);
    setProject({ ...project, index });
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const startDate = dateObject.date.startDateToUse;
  const endDate = dateObject.date.endDateToUse;
  const weekssDiff = moment(endDate).diff(moment(startDate), "weeks") + 1;
  let accordionWidth = 0;
  accordionWidth = 300 + weekssDiff * 7 * 78;
  let referenceDate = moment(startDate).subtract(
    moment(startDate).day(),
    "days"
  );

  const resetRefDate = () => {
    referenceDate = moment(startDate).subtract(moment(startDate).day(), "days");
  };

  return (
    <div style={styles.container}>
      <ScrollContainer
        style={styles.scrollContainer}
        horizontal={true}
        vertical={false}
      >
        <div>
          <div style={{ width: 300 }}></div>
          <div style={{ ...styles.flexRow, marginLeft: 300 }}>
            {[...Array(weekssDiff)].map((x, index) => (
              <div>
                <div
                  style={{
                    ...styles.monthsListContainer,
                    borderTopLeftRadius: index === 0 ? 8 : 0,
                    borderTopRightRadius: index === weekssDiff - 1 ? 8 : 0,
                  }}
                >
                  <Typography>
                    {"Week of " + referenceDate.format("MM/YY")}
                  </Typography>
                </div>
                {
                  <List disablePadding style={styles.flexRow}>
                    {[...Array(7)].map((x, i) => {
                      const day = referenceDate.format("ddd");
                      const date = referenceDate.format("DD");
                      referenceDate.add(1, "days");
                      return (
                        <div style={styles.daysListContainer}>
                          <div>
                            <Typography variant="caption">{day}</Typography>
                            <Typography>{date}</Typography>
                          </div>
                        </div>
                      );
                    })}
                  </List>
                }
              </div>
            ))}
          </div>
        </div>
        {resetRefDate()}
        <div>
          {projects.map((project) => (
            <div>
              {/* {setProjectId(project._id)} */}
              <Accordion
                style={{ width: accordionWidth }}
                square
                defaultExpanded={true}
                elevation={0}
              >
                <AccordionSummary
                  style={{
                    ...styles.accordion,
                    backgroundColor: project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low' && 'green'))) : "royalblue",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{project.name}</Typography>
                </AccordionSummary>
                {project.tasks.map((task, index) => (
                  <div style={styles.flexRow}>
                    <div style={styles.taskContainer}>
                      <Typography
                        style={{
                          ...styles.taskText,
                          borderBottomColor:
                            index === project.tasks.length - 1
                              ? "white"
                              : "lightGrey",
                        }}
                      >
                        {task.name}
                      </Typography>
                    </div>
                    {/** rendering boxes */}
                    {[...Array(weekssDiff)].map((x) => (
                      <div style={styles.flexRow}>
                        {[...Array(7)].map((x, i) => {
                          let compareResult = false;
                          let taskvalue = " ";

                          const strtDate = moment(task.startDate, "DD-MM-YYYY");
                          const dueDate = moment(task.endDate, "DD-MM-YYYY");


                          referenceDate.isBetween(strtDate, dueDate) &&
                            (compareResult = true);

                          referenceDate.format("DD MM YYYY") ===
                            strtDate.format("DD MM YYYY") &&
                            (compareResult = true) &&
                            (taskvalue = strtDate.format("ddd DD"));

                          referenceDate.format("DD MM YYYY") ===
                            dueDate.format("DD MM YYYY") &&
                            (compareResult = true) &&
                            (taskvalue = dueDate.format("ddd DD"));

                          referenceDate.add(1, "days");

                          return (
                            <div
                              style={{
                                ...styles.gridBoxContainer,
                                borderColor: compareResult
                                  ? project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low') && 'green')) : "royalblue"
                                  : "lightGrey",
                                backgroundColor: compareResult
                                  ? project.priority ? (project.priority === 'high' ? 'purple' : (project.priority === 'moderate' ? 'orange' : (project.priority === 'low') && 'green')) : "royalblue"
                                  : "#f5f5f5",
                              }}
                            >
                              {compareResult && (
                                <ButtonBase
                                  aria-describedby={id}
                                  onClick={event => handleClickAndSendProps(event, project, index)}
                                  style={{ color: "white", width: 60 }}
                                >
                                  {taskvalue}
                                </ButtonBase>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    {resetRefDate()}
                  </div>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <ModifyProject handleClose={handleClose} project={project} />
        </Popover>
      </ScrollContainer>
    </div>
  );
};

const Timeline = ({ monthTimeline, projects }) => {
  console.log("projects are: ", projects);
  const projectObj = useSelector(state => state.project);
  //fetching projects again and sending instead of using prop. no difference detected
  return monthTimeline ? <MonthTimeline projects={projectObj.projects.projects} /> : <WeekTimeline projects={projectObj.projects.projects} />;
};

export default Timeline;
