import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fbase";
import { checkUser } from "../state/auth/authSlice";
import { RootState } from "../state/store";

const Home = () => {
  const dispatch = useDispatch();

  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
        isLoggedIn: true,
      };
      dispatch(checkUser(userInfo));
    } else {
      const userInfo = {
        uid: "",
        displayName: "",
        email: "",
        isLoggedIn: false,
      };
      dispatch(checkUser(userInfo));
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2">My SNS</Typography>
      <Typography variant="h6">{isLoggedIn ? `${displayName}님 안녕하세요` : "로그인 해주세요"}</Typography>
    </Box>
  );
};

export default Home;
