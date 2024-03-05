import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Box, Skeleton, Typography } from "@mui/material";
import PostList from "../components/PostList";
import PostItem from "../components/PostItem";
import { IPost } from "../types";

const post: IPost = {
  id: 0,
  author: "author",
  displayName: "displayName",
  content: "content",
  date: 0,
  image0: "imaage1",
  image1: "imaage1",
  image2: "imaage1",
  image3: "imaage1",
  image4: "imaage1",
  imagesCount: 5,
};

const Home = () => {
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "30px" }}>
      {/* <Typography variant="h2">My SNS</Typography> */}
      {/* <Typography variant="h6">{isLoggedIn ? `${displayName}님 안녕하세요` : "로그인 해주세요"}</Typography> */}
      <PostList />
      <PostItem post={post} />
    </Box>
  );
};

export default Home;
