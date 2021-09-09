import { Button, ButtonGroup, Card, Popover } from "@material-ui/core";
import { useState } from "react";
import Timeline from "./Timeline";

import AddIcon from "@material-ui/icons/Add";
import NewLegend from "./NewLegend";
import DateRange from "./DateRange";


const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",

  },
  cardHeaderContainer: {
    display: "flex",
    width: "100%",
    backgroundColor: "#042f66",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
};

const Dashboard = () => {
  const [monthTimeline, setMonthTimeline] = useState(true); const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  return (
    <Card style={styles.cardContainer}>
      <div style={styles.cardHeaderContainer}>
        <ButtonGroup disableElevation>
          <Button
            onClick={() => !monthTimeline && setMonthTimeline(!monthTimeline)}
            style={{
              borderWidth: 0,
              color: monthTimeline ? "royalblue" : "white",
            }}
          >
            Monthly
          </Button>
          <Button
            onClick={() => monthTimeline && setMonthTimeline(!monthTimeline)}
            style={{
              borderWidth: 0,
              borderLeftWidth: 1,
              borderColor: "white",
              color: !monthTimeline ? "royalblue" : "white",
            }}
          >
            Weekly
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ padding: 16, }}>
        {/*range picker*/}
        <DateRange />
        <Timeline />
        {/*legend with popover*/}
        <Button aria-describedby={id}
          onClick={handleClick} style={{ alignSelf: 'flex-start' }} size='small' endIcon={<AddIcon />}>
          Legend
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
          <NewLegend handleClose={handleClose} />
        </Popover>
      </div>

    </Card>
  );
};

export default Dashboard;
