import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Bottom = () => {
  const path = useLocation().pathname;
  const [value, setValue] = useState(path);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log(path);
    setValue(path);
  }, [isLoggedIn, path]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction component={Link} to="/create" value="/create" icon={<CreateIcon />} />
        <BottomNavigationAction component={Link} to="/" value="/" icon={<Home />} />
        <BottomNavigationAction component={Link} to={isLoggedIn ? "/profile" : "/login"} value={isLoggedIn ? "/profile" : "/login"} icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottom;
