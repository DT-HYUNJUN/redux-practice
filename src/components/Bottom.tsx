import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Bottom = () => {
  const path = useLocation();

  const [value, setValue] = useState(path.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction component={Link} to="/create" value="/create" icon={<CreateIcon />} />
        <BottomNavigationAction component={Link} to="/" value="/" icon={<Home />} />
        <BottomNavigationAction component={Link} to="/signup" value="/signup" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottom;
