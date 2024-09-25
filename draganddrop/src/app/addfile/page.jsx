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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddBox, PublishOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import PublishIcon from "@mui/icons-material/Publish";
function Addfile() {
  const [dragFile, setDragFile] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState([]);
  const [situation, setSituation] = useState("No file is add yet");
  const handelChange = (e) => {
    e.preventDefault();
    console.log("file add");
    if (e.target.files && e.dataTransfer.files[0]) {
      console.log(`file:${e.target.files}`);
      for (let i = 0; i < e.target.files.length; i++) {
        setFile((prevState) => [...prevState, e.target.files[i]]);
      }
    }
    setSituation("Files list")

  };
  const handleSubmitFile = (e) => {
    if (!file.length === 0) {
      setSituation("Files list");
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(false);
    if (e.dataTransfer.file && e.dataTransfer.file[0]) {
      for (let i = 0; i < e.dataTransfer.file.length; i++) {
        setFile((prevState) => [...prevState, e.target.files[i]]);
        setSituation("Files list")
      }
    }
  };
  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragFile(false);
    setSituation("Files list")

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
    setSituation("Files list")

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
    setSituation("Files list")

  };

  return (
    <>
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
            <Stack
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
            >
              <FormControl
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
                  name="fileinput"
                  id="fileinput"
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
          </Stack>
          <Stack sx={{ width: "45%", height: "100%" }} m={1}>
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
              {situation}
            </Typography>
            <List>
              {file.map((file, i) => {
                return (
                  <ListItem divider={true} key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.name}
                    />
                    <ListItemButton sx={{ ":hover": { borderRadius: "50%" } }}>
                      <EditIcon />
                    </ListItemButton>
                    <ListItemButton sx={{ ":hover": { borderRadius: "50%" } }}>
                      <VisibilityIcon />
                    </ListItemButton>
                    <ListItemButton sx={{ ":hover": { borderRadius: "50%" } }}>
                      <DeleteIcon
                        onClick={() => {
                          removeFile(file.name, i);
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Addfile;

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
