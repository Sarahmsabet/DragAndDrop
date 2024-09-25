"use client";
import React, { useState, useRef } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Stack,
  Typography,
  TextField,
  ListItemButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Visibility, Edit, Delete, Folder } from "@mui/icons-material";
function Addfile() {
  // states
  const [open, setOpen] = useState(false);
  const [dragFile, setDragFile] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState([]);
  const [index, setIndex] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  // functions
  // Add File
  const handelChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        setFile((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setFile((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(false);
  };
  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(true);
  };
  const dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(true);
  };
  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };
  // removing
  const removeFile = (fileName, i) => {
    const newArr = [...file];
    newArr.splice(i, 1);
    setFile([]);
    setFile(newArr);
  };
  // editing function
  const editName = () => {
    let getFile = [...file];
    let getFileIndex = { ...file[index] };
    getFileIndex.name = textFieldValue;
    getFile.splice(index, 1, getFileIndex);
    setFile(getFile);
  };

  const handleClickOpen = (i) => {
    setOpen(true);
    setIndex(i);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const preview = () => {};
  return (
    <>
      {/* dialog box for editing file name */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const text = formJson.text;
            handleClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText>enter your new name</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="text"
            name="text"
            label="text"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={editName}>
            edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* main container */}
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#4db6ac",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            border: 1,
            borderColor: "black",
            borderRadius: 5,
            height: "50vh",
            width: "50vw",
          }}
        >
          {/* add file container */}
          <Stack sx={{ width: "45%", height: "100%" }} m={1}>
            <FormControl
              sx={{
                border: 1,
                borderRadius: 5,
                width: "100%",
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
              m={0.5}
              onDragEnter={dragEnter}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onDrop={handleDrop}
              onDragLeave={dragLeave}
              onDragOver={dragOver}
            >
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                hidden
                ref={inputRef}
                multiple={true}
                onChange={handelChange}
                accept=".xlsx,.xls,image/*,.doc,.docs,.ppt,.pptx,.txt,.pdf"
              />
              <Typography variant="p" color="initial" m={0.5}>
                Drop your files here or{" "}
                <Typography
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  variant="span"
                  color="initial"
                  onClick={openFileExplorer}
                >
                  select
                </Typography>{" "}
                your file
              </Typography>
            </FormControl>
          </Stack>
          {/* files list */}
          <Stack sx={{ width: "45%", height: "90%" }} m={1}>
            <List sx={{ overflow: "auto" }}>
              {file.length === 0 ? (
                <Typography
                  sx={{
                    mt: 4,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  variant="h6"
                  component="div"
                >
                  No file add
                </Typography>
              ) : (
                file.map((file, i) => {
                  return (
                    <ListItem divider={true} key={i}>
                      <ListItemAvatar>
                        <Avatar>
                          <Folder />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={file.name} />
                      <ListItemButton sx={{ borderRadius: "50%" }}>
                        <Edit onClick={() => handleClickOpen(i)} />
                      </ListItemButton>
                      <ListItemButton disabled sx={{ borderRadius: "50%" }}>
                        <Visibility />
                      </ListItemButton>
                      <ListItemButton sx={{ borderRadius: "50%" }}>
                        <Delete
                          onClick={() => {
                            removeFile(file.name, i);
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              )}
            </List>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Addfile;
