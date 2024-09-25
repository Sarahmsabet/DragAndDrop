"use client";
import React, { useState, useRef } from "react";
import {
  Container,
  Box,
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
  FormLabel,
  FormHelperText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddBox, PublishOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import PublishIcon from "@mui/icons-material/Publish";

function Addfile() {
  const [open, setOpen] = useState(false);
  const [dragFile, setDragFile] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState([]);
  const [index, setIndex] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handelChange = (e) => {
    e.preventDefault();
    console.log("file add");
    if (e.target.files) {
      console.log(`file:${e.target.files}`);
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
  const removeFile = (fileName, i) => {
    const newArr = [...file];
    newArr.splice(i, 1);
    setFile([]);
    setFile(newArr);
  };
  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };
  const handleClickOpen = (i) => {
    setOpen(true);
    setIndex(i);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editName = () => {
    let getFile = [...file];
    let getFileIndex = { ...file[index] };
    getFileIndex.name = textFieldValue;
    getFile.splice(index, 1, getFileIndex);
    setFile(getFile);
  };
  const preview = () => {};
  return (
    <>
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
              <Typography variant="p" color="initial">
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
          <Stack sx={{ width: "45%", height: "100%" }} m={1}>
            <List>
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
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={file.name} />
                      <ListItemButton sx={{ borderRadius: "50%" }}>
                        <EditIcon onClick={() => handleClickOpen(i)} />
                      </ListItemButton>
                      <ListItemButton sx={{ borderRadius: "50%" }}>
                        <VisibilityIcon />
                      </ListItemButton>
                      <ListItemButton sx={{ borderRadius: "50%" }}>
                        <DeleteIcon
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
