import React, { useEffect, useState } from "react";
import { Alert, Backdrop, Badge, Box, Button, IconButton, Popover, TextField, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, logOutAsync } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import { useNavigate } from "react-router-dom";

import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

import UserPost from "../components/UserPost";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileInfo from "../components/ProfileInfo";

const dummyData = [
  { id: 0, name: "park", content: "content1", imagesCount: 0, date: 0 },
  { id: 1, name: "park", content: "content2", imagesCount: 0, date: 0 },
  { id: 2, name: "park", content: "content3", imagesCount: 0, date: 0 },
  { id: 3, name: "park", content: "content4", imagesCount: 0, date: 0 },
  { id: 4, name: "park", content: "content5", imagesCount: 0, date: 0 },
];

const Profile = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isDeleted = useSelector((state: RootState) => state.auth.isDeleted);
  const displayName = useSelector((state: RootState) => state.auth.displayName);

  useEffect(() => {
    if (!isLoggedIn || isDeleted) navigate("/", { replace: true });
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  const handleDeleteUser = () => {
    dispatch(deleteUserAsync(displayName));
  };

  const handleClickEditProfile = () => {};

  // Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box component="div" display="flex" flexDirection="column">
          <Button variant="text" onClick={handleLogOut}>
            로그아웃
          </Button>
          <Button variant="text" color="error" onClick={handleDeleteUser}>
            회원탈퇴
          </Button>
        </Box>
      </Popover>
      <IconButton sx={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleClickPopover}>
        <MoreVertIcon />
      </IconButton>
      <Box display="flex" justifyContent="center">
        <ProfileInfo />
      </Box>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ borderRadius: "12px", bgcolor: "white" }} p={4}>
          <DeleteIcon sx={{ fontSize: "40px" }} color="error" />
          <Typography sx={{ color: "black" }}>정말 탈퇴하시겠습니까?</Typography>
          <Button sx={{ fontSize: "1rem" }} onClick={handleDeleteUser} fullWidth variant="contained" color="error">
            탈퇴
          </Button>
          <Typography onClick={handleClose} sx={{ color: grey[600] }}>
            취소
          </Typography>
        </Box>
      </Backdrop>
      <Box>
        <Typography mt={10}>내 피드</Typography>
        <Box sx={{ overflow: "auto", whiteSpace: "nowrap" }} display="flex" gap={2} pt={2} pb={4} width={350}>
          {dummyData.map((post) => (
            <UserPost key={post.id} post={post} />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
