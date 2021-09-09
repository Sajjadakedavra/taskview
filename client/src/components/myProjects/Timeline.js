import ScrollContainer from "react-indiana-drag-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useSelector } from "react-redux";
import moment from "moment";


const {
  AccordionSummary,
  Accordion,
  List,
  Typography,
} = require("@material-ui/core");

const months = [
  { name: "January", days: [1, 2, 3] },
  { name: "January", days: [1, 2, 3, 5] },
  { name: "January", days: [1, 2, 3] },
  { name: "January", days: [1, 2, 3, 5] },
  { name: "January", days: [1, 2, 3] },
  { name: "January", days: [1, 2, 3, 5] },
];

const data = [
  {
    id: 0,
    name: "Project 1",
    color: "pink",
    tasks: [{ id: 0, name: "Task 1", dueDate: new Date() }],
  },
];

let accordionWidth = 0;
var diffe = 0

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
    borderColor: "lightGrey",
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

const Timeline = () => {

  const dateObject = useSelector(state => state.date);

  const monthsDiff = moment(dateObject.date.endDateToUse).diff(dateObject.date.startDateToUse, "months") + 1;
  accordionWidth = 300 + monthsDiff * 4 * 78


  let referenceDate = moment(dateObject.date.startDateToUse).subtract(parseInt(moment(dateObject.date.startDateToUse).format('D')) - 1, 'days')


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
              <div>
                <div
                  style={{
                    ...styles.monthsListContainer,
                    borderTopLeftRadius: index === 0 ? 8 : 0,
                  }}
                >
                  <Typography>{referenceDate.format("MMMM")}</Typography>
                  {console.log("BB" + referenceDate.add(1, 'months'))}
                </div>
                <List disablePadding style={styles.flexRow}>
                  {[7, 14, 21, 28].map((day) => (
                    <div style={styles.daysListContainer}>
                      <div>
                        <Typography>{day}</Typography>
                      </div>
                    </div>
                  ))}
                </List>
              </div>
            ))}

          </div>
        </div>
        <div>
          {data.map((project) => (
            <div>
              <Accordion
                style={{ width: accordionWidth }}
                square
                defaultExpanded={true}
                elevation={0}
              >
                <AccordionSummary
                  style={{
                    ...styles.accordion,
                    backgroundColor: project.color,
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
                        {console.log(task.name)}
                        {task.name}
                      </Typography>
                    </div>
                    <div style={styles.flexRow}>
                      {(referenceDate = moment(dateObject.date.startDateToUse).subtract(parseInt(moment(dateObject.date.startDateToUse).format('D')) - 1, 'days')) &&
                        [...Array(monthsDiff)].map((x, index) => <div style={styles.flexRow}>
                          {[...Array(4)].map((x, i) => (<div
                            style={{
                              ...styles.gridBoxContainer,
                              backgroundColor:
                                referenceDate === moment(task.dueDate)
                                  ? project.color
                                  : "#f5f5f5",
                            }}
                          >
                            {referenceDate === moment(task.dueDate) && (
                              <Typography style={{ color: "white" }}>
                                {task.name}
                              </Typography>
                            )}
                            {console.log("AA" + referenceDate.add(7, 'days'))}
                            {console.log(referenceDate.format("YYYY-MM-DD"))}
                          </div>))}
                          {() => (referenceDate = referenceDate.subtract(parseInt(referenceDate.format('D')) - 1, 'days'))}
                        </div>)}

                    </div>
                  </div>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default Timeline;
