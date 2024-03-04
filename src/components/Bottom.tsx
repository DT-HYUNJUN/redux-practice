import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Bottom = () => {
  const path = useLocation().pathname;
  const [value, setValue] = useState(path);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isDeleted = useSelector((state: RootState) => state.auth.isDeleted);

  useEffect(() => {
    setValue(path);
  }, [isLoggedIn, isDeleted, path]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleHomeButtonClick = () => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 200); // 애니메이션 속도 조절
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };

    scrollToTop();
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTopLeftRadius: "18px", borderTopRightRadius: "18px" }} elevation={3}>
      <BottomNavigation sx={{ borderTopLeftRadius: "18px", borderTopRightRadius: "18px", backgroundColor: "#ffd391" }} value={value} onChange={handleChange}>
        <BottomNavigationAction onClick={handleHomeButtonClick} component={Link} to="/" value="/" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction component={Link} to="/create" value="/create" icon={<AddBoxOutlinedIcon />} />
        <BottomNavigationAction component={Link} to={isLoggedIn ? "/profile" : "/login"} value={isLoggedIn ? "/profile" : "/login"} icon={<AccountCircleOutlinedIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottom;
