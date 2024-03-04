import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, styled } from "@mui/material";
import { getPosts } from "../utils/getPosts";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IPost } from "../types";

const dummyData = [
  { id: 0, name: "park", content: "content1" },
  { id: 1, name: "park", content: "content2" },
  { id: 2, name: "park", content: "content3" },
  { id: 3, name: "park", content: "content4" },
  { id: 4, name: "park", content: "content5" },
];

const UserPosts = () => {
  const [posts, setPosts] = useState(dummyData);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const displayName = useSelector((state: RootState) => state.auth.displayName);

  // getPosts(displayName).then((res) => setPosts(res));
  return (
    <div>
      <UserPostsBox sx={{ overflow: "auto", whiteSpace: "nowrap" }} display="flex" gap={2} pt={4} pb={4} width={350} onClick={handleOpen}>
        {posts.map((post) => (
          <Box p={2} height={200} sx={{ bgcolor: "white", borderRadius: "12px" }} key={post.id}>
            <div>{post.name}</div>
            <img style={{ backgroundColor: "black", width: "300px" }} src="#" alt="#" />
            <div>{post.content}</div>
          </Box>
        ))}
      </UserPostsBox>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPosts;

const UserPostsBox = styled(Box)({});
