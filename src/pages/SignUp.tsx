import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn]);

  const isDisabled = displayName === "" || email === "" || password === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "displayName") setDisplayName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpAsync({ displayName, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ArrowBackIosNew onClick={() => navigate(-1)} sx={{ position: "fixed", top: 10, left: 10 }} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", height: "100vh" }}>
        <Typography variant="h3" gutterBottom>
          회원 가입
        </Typography>
        <TextField value={displayName} name="displayName" onChange={handleChange} fullWidth label="닉네임" variant="outlined" />
        <TextField value={email} name="email" type="email" onChange={handleChange} fullWidth label="이메일" variant="outlined" />
        <TextField value={password} name="password" type="password" onChange={handleChange} fullWidth label="비밀번호" variant="outlined" />
        <Button type="submit" fullWidth disabled={isDisabled} variant="contained">
          계속하기
        </Button>
        <Button component={Link} to="/login" fullWidth variant="outlined">
          로그인
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
