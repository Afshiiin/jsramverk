import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { borderRight } from "@mui/system";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Editor(props) {
  const classes = useStyles();

  const [editorValue, setEditorValue] = React.useState("");

  const [fileName, setFileName] = React.useState("");
  const [idOfDoc, setIdOfDoc] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  //API NODE.JS

  const [api, setApi] = React.useState();

  useEffect(() => {
    fetch("http://localhost:1337/get")
      .then((result) => result.json())
      .then((result) => setApi(result));

    return () => {};
  }, []);

  const getEditorValue = () => {
    console.log(editorValue);
  };

  const saveValueInDB = () => {
    if (fileName) {
      fetch("http://localhost:1337/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fileName, value: editorValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setAlertMessage("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("File Saved");
    } else {
      setAlertMessage("Give a name to the file!");
    }
  };
  const putValueInDB = () => {
    if (fileName) {
      fetch("http://localhost:1337/put", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idOfDoc,
          name: fileName,
          value: editorValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setAlertMessage("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("File Updated");
    } else {
      setAlertMessage("Give a name to the file!");
    }
  };

  const deleteValueInDB = () => {
    if (fileName) {
      fetch("http://localhost:1337/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idOfDoc,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setAlertMessage("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("File Updated");
    } else {
      setAlertMessage("Give a name to the file!");
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Box textAlign="center">
          <TextField
            id="outlined-basic"
            label="Enter file name"
            variant="standard"
            focused
            required
            onChange={(event) => {
              setFileName(event.target.value);
            }}
            value={fileName ? fileName : null}
          />
          <Button
            style={{
              marginTop: "1.1%",
              textTransform: "none",
              borderRight: "1px solid black",
            }}
            onClick={saveValueInDB}
          >
            Save The File
          </Button>
          <Button
            style={{
              marginTop: "1.1%",
              textTransform: "none",
              borderRight: "1px solid black",
            }}
            onClick={getEditorValue}
          >
            Show In Console
          </Button>
        </Box>
      </Paper>
      <div>
        <div
          style={{
            width: "80%",
            border: "1px solid black",
            minHeight: "82.5vh",
            display: "inline-block",
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorValue ? editorValue : ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorValue(data);
            }}
          />
        </div>
        <div
          style={{
            width: "19.47%",
            display: "inline-block",
            position: "absolute",
            minHeight: "82.5vh",
          }}
        >
          {alertMessage ? (
            <Stack>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                <strong>{alertMessage}</strong>
              </Alert>
            </Stack>
          ) : null}
          <div
            style={{
              borderBottom: "1px solid black",
            }}
          >
            <h3>Existing files</h3>
          </div>
          {console.log(editorValue)}
          <Paper style={{ maxHeight: "70vh", overflow: "auto" }}>
            <List>
              {api
                ? api.map((DBvalue) => (
                    <div
                      style={{
                        marginTop: "3px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setEditorValue(DBvalue.value);
                          setFileName(DBvalue.name);
                          setIdOfDoc(DBvalue._id);
                          setAlertMessage("");
                        }}
                      >
                        {DBvalue.name}
                      </Button>

                      <Divider variant="middle" />
                      <div>
                        <Button onClick={putValueInDB}>
                          Edit <EditIcon fontSize="small" />
                        </Button>
                        <Button onClick={deleteValueInDB}>
                          Delete
                          <DeleteForeverIcon fontSize="small" />
                        </Button>
                      </div>
                    </div>
                  ))
                : "There is no saved file to show"}
            </List>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Editor;
