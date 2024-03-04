import React, { useEffect, useState } from "react";
import { Alert, Backdrop, Badge, Box, Button, IconButton, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, logOutAsync } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isDeleted = useSelector((state: RootState) => state.auth.isDeleted);
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const photoURL = useSelector((state: RootState) => state.auth.photoURL);

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

  const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setPreviewImg(reader.result as string);
    };
  };

  const handleClickEditProfile = () => {};

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt="50px" width={200} p={4} sx={{ borderRadius: "12px", bgcolor: "white" }}>
          <Badge
            badgeContent={
              <IconButton component="label">
                <EditOutlinedIcon fontSize="small" sx={{ borderRadius: "50%", padding: "2px", border: "0.1px solid grey", bgcolor: "white" }} color="primary" />
                <VisuallyHiddenInput accept="image/*" onChange={uploadProfileImage} type="file" />
              </IconButton>
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            overlap="circular"
          >
            {photoURL || previewImg ? <ProfileImage src={previewImg} alt="" /> : <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />}
          </Badge>
          <Box display="flex" flexDirection="column" textAlign="center" gap={2}>
            <Typography>{displayName}</Typography>
            <Box component="div" display="flex" gap={1}>
              <Button sx={{ color: "white", padding: "4px 2px" }} color="error" onClick={handleLogOut} variant="contained">
                로그아웃
              </Button>
              <Button sx={{ color: "white", padding: "4px 2px" }} color="error" onClick={handleOpen} variant="contained">
                회원탈퇴
              </Button>
            </Box>
          </Box>
        </Box>
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
        <UserPosts />
      </Box>
    </div>
  );
};

export default Profile;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  objectFit: "cover",
  border: "0.5px solid grey",
});
