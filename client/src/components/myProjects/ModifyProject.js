import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/SendRounded";
import { useState } from "react";

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 600,
    height: 600,
  },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
  flexRow: { display: "flex", flexDirection: "row" },
  flexColumn: { display: "flex", flexDirection: "column" },
};

const comments = [
  {
    name: "Montela",
    comment: "The fuck is this task...",
    date: moment("21-9-2021", "DD-MM-YYYY"),
  },
];

const ModifyProject = ({ handleClose }) => {
  const [edit, setEdit] = useState(true);
  const [deleteBtn, setDelete] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const HeaderBar = () => (
    <div style={styles.projectBar}>
      <ButtonGroup disableElevation>
        <Button
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
              deleteBtn && setDelete(!deleteBtn);
              duplicate && setDuplicate(!duplicate);
            }
          }}
          style={{
            borderWidth: 0,
            color: edit ? "royalblue" : "white",
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (!deleteBtn) {
              setDelete(!deleteBtn);
              edit && setEdit(!edit);
              duplicate && setDuplicate(!duplicate);
            }
          }}
          style={{
            borderWidth: 0,
            borderLeftWidth: 1,
            borderColor: "white",
            color: "white",
            color: deleteBtn ? "royalblue" : "white",
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            if (!duplicate) {
              setDuplicate(!duplicate);
              deleteBtn && setDelete(!deleteBtn);
              edit && setEdit(!edit);
            }
          }}
          style={{
            borderWidth: 0,
            borderLeftWidth: 1,
            borderColor: "white",
            color: "white",
            color: duplicate ? "royalblue" : "white",
          }}
        >
          Duplicate
        </Button>
      </ButtonGroup>
      <IconButton
        onClick={handleClose}
        style={{ color: "white" }}
        fontSize="small"
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </div>
  );

  const CommentItem = ({ comment }) => (
    <div>
      <div
        style={{
          ...styles.flexRow,
          alignItems: "center",
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ fontWeight: "bold", marginRight: 8 }}
        >
          {comment.name}
        </Typography>
        <Typography style={{ color: "gray" }} variant="caption">
          {" - " + comment.date.format("DD MM YYYY")}
        </Typography>
      </div>
      <Typography style={{ color: "gray" }} variant="subtitle2">
        {comment.comment}
      </Typography>
    </div>
  );

  const Comments = () => (
    <div
      style={{
        ...styles.flexColumn,
        width: 250,
        height: 540,
        backgroundColor: "lightgrey",
        padding: 8,
      }}
    >
      <Typography>Comments</Typography>
      <Divider variant="fullWidth" style={{ marginTop: 8, marginBottom: 8 }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {comments.map((comment) => (
            <CommentItem comment={comment} />
          ))}
        </div>

        <TextField
          multiline={true}
          variant="outlined"
          size="small"
          style={{
            backgroundColor: "white",
            borderRadius: 4,
          }}
          rows={3}
          InputProps={{
            endAdornment: (
              <InputAdornment class="marginDense" position="end">
                <SendIcon style={{ color: "#042f66" }} fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder={`Comment as ${"Mohammad"}`}
        />
      </div>
    </div>
  );

  const Editor = () => (
    <div style={{ ...styles.flexColumn, width: 350, padding: 8 }}>
      <div style={{ ...styles.flexRow }}>
        <div style={{ marginRight: 4 }}>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Project Name
          </Typography>
          <TextField
            name="name"
            style={{ marginBottom: 8 }}
            variant="outlined"
            size="small"
          />
        </div>
        <div style={{ marginLeft: 4 }}>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Task Name
          </Typography>
          <TextField
            name="name"
            style={{ marginBottom: 8 }}
            variant="outlined"
            size="small"
          />
        </div>
      </div>
      <TextField
        multiline={true}
        variant="outlined"
        size="small"
        style={{
          backgroundColor: "white",
          borderRadius: 4,
          marginTop: 8,
          marginBottom: 8,
        }}
        rows={5}
      />
      <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
        Start Date
      </Typography>
      <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
        Due Date
      </Typography>
      <div style={styles.flexRow}>
        <div style={{ marginRight: 4 }}>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Priority
          </Typography>
        </div>
        <div style={{ marginleft: 4 }}>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Color
          </Typography>
        </div>
      </div>
      <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
        Files
      </Typography>
    </div>
  );

  return (
    <Card style={styles.cardContainer}>
      <HeaderBar />
      <div style={styles.flexRow}>
        <Editor />
        <Comments />
      </div>
    </Card>
  );
};

export default ModifyProject;
