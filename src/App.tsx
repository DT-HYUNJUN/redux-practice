import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Container, ThemeProvider, createTheme, styled } from "@mui/material";
import Bottom from "./components/Bottom";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { checkUser } from "./state/auth/authSlice";
import { auth } from "./fbase";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
});

function App() {
  const dispatch = useDispatch();

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
    <ThemeProvider theme={theme}>
      <MyContainer maxWidth="sm">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<Create />} />
          </Routes>
          <Bottom />
        </BrowserRouter>
      </MyContainer>
    </ThemeProvider>
  );
}

export default App;

const MyContainer = styled(Container)({
  marginBottom: "66px",
});
