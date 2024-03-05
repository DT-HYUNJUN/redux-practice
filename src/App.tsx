import React, { useEffect } from "react";
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
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
  palette: {
    primary: {
      main: "#7a95f7",
    },
    error: {
      main: red[400],
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL,
          isLoggedIn: true,
          isDeleted: false,
        };
        dispatch(checkUser(userInfo));
      } else {
        const userInfo = {
          uid: "",
          displayName: "",
          email: "",
          photoURL: "",
          isLoggedIn: false,
          isDeleted: false,
        };
        dispatch(checkUser(userInfo));
      }
    });
  }, []);

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
  minWidth: "375px",
});
