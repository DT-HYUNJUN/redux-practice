import React, { useEffect, useState } from "react";
import { Badge, Box, Button, IconButton, TextField, Typography, styled } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { updateUserAsync } from "../state/auth/authSlice";

const ProfileInfo = () => {
  const [newDisplayName, setNewDisplayName] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [profileImg, setProfileImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState("");

  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const photoURL = useSelector((state: RootState) => state.auth.photoURL);
  const email = useSelector((state: RootState) => state.auth.email);

  const dispatch = useDispatch<AppDispatch>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  const handleClickEdit = () => {
    setToggleEdit(true);
  };

  const handleCloseEdit = () => {
    setToggleEdit(false);
  };

  const handleClickSubmit = () => {
    if (profileImg) {
      dispatch(updateUserAsync({ email, newDisplayName, profileImg }));
    } else {
      dispatch(updateUserAsync({ email, newDisplayName }));
    }
    setToggleEdit(false);
  };

  const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setProfileImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImg(reader.result as string);
    };
  };

  return (
    <Box display="flex" justifyContent="" alignItems="center" gap={4} mt="50px" width={260} p={4} sx={{ borderRadius: "12px", bgcolor: "white" }}>
      <Box component="div" display="flex" flexDirection="column" alignItems="center">
        {toggleEdit ? (
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
            {photoURL || previewImg ? <ProfileImage src={previewImg || photoURL} alt="" /> : <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />}
          </Badge>
        ) : photoURL || previewImg ? (
          <ProfileImage src={previewImg || photoURL} alt="" />
        ) : (
          <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />
        )}
      </Box>
      <Box display="flex" flexDirection="column" textAlign="center" gap={toggleEdit ? 0 : 2}>
        {toggleEdit ? <TextField size="small" onChange={handleInput} defaultValue={displayName} /> : <Typography color="primary">{displayName}</Typography>}
        {/* <Box component="div" display="flex" gap={1}> */}
        {toggleEdit ? (
          <Box display="flex" justifyContent="center">
            <Button onClick={handleClickSubmit}>수정 완료</Button>
            <Button sx={{ color: "grey" }} onClick={handleCloseEdit}>
              취소
            </Button>
          </Box>
        ) : (
          <Button sx={{ color: "white", padding: "4px 2px" }} variant="contained" onClick={handleClickEdit}>
            프로필 수정
          </Button>
        )}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default ProfileInfo;

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
