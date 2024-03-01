import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import Bottom from "./components/Bottom";
import Create from "./pages/Create";
import Profile from "./pages/Profile";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
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
      </Container>
    </ThemeProvider>
  );
}

export default App;
