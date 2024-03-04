import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Box, Typography } from "@mui/material";
import PostList from "../components/PostList";

const Home = () => {
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "30px" }}>
      {/* <Typography variant="h2">My SNS</Typography> */}
      {/* <Typography variant="h6">{isLoggedIn ? `${displayName}님 안녕하세요` : "로그인 해주세요"}</Typography> */}
      <PostList />
    </Box>
  );
};

export default Home;
