import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) navigate("/", { replace: true });
  });

  const handleClick = () => {
    dispatch(logOutAsync());
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="error">
        로그아웃
      </Button>
    </div>
  );
};

export default Profile;
