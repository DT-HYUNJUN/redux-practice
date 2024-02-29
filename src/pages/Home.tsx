import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fbase";
import { checkUser } from "../state/auth/authSlice";
import { RootState } from "../state/store";

const Home = () => {
  const dispatch = useDispatch();

  const displayName = useSelector((state: RootState) => state.auth.displayName);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
      };
      dispatch(checkUser(userInfo));
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2">My SNS</Typography>
      <Typography variant="h6">{displayName}님 안녕하세요</Typography>
    </Box>
  );
};

export default Home;