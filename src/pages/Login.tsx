import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { logInAsync } from "../state/auth/authSlice";
import { ArrowBackIosNew, Visibility, VisibilityOff } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn]);

  const isDisabled = email === "" || password === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logInAsync({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ArrowBackIosNew onClick={() => navigate(-1)} sx={{ position: "fixed", top: 10, left: 10 }} />
      <LoginBox>
        <Typography variant="h3" gutterBottom>
          로그인
        </Typography>
        <TextField value={email} name="email" type="email" onChange={handleChange} fullWidth label="이메일" variant="outlined" />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
          <OutlinedInput
            value={password}
            name="password"
            onChange={handleChange}
            fullWidth
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button type="submit" fullWidth disabled={isDisabled} variant="contained">
          계속하기
        </Button>
        <Divider flexItem />
        <Button component={Link} to="/signup" fullWidth variant="outlined">
          이메일 회원가입
        </Button>
      </LoginBox>
    </form>
  );
};

export default Login;

const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginTop: "100px",
});
