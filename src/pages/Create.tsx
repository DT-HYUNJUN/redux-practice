import React, { useEffect, useState } from "react";
import { Box, Button, Container, IconButton, ImageList, ImageListItem, TextField, Typography, styled } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import { postCreate } from "../state/post/postSlice";
import { AppDispatch, RootState } from "../state/store";
import { Link, useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import Zoom from "@mui/material/Zoom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Create = () => {
  const [content, setContent] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);

  const [postImg, setPostImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  // const isCreated = useSelector((state: RootState) => state.post.isCreated);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const navigate = useNavigate();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileArr = e.target.files;
    if (fileArr) {
      setPostImg(Array.from(fileArr));

      let fileUrl = [];
      for (let i = 0; i < fileArr.length; i++) {
        let fileRead = new FileReader();
        fileRead.onload = function () {
          fileUrl[i] = fileRead.result;
          setPreviewImg([...fileUrl]);
          fileRead.readAsDataURL(fileArr[i]);
        };
      }
    }
  };

  // useEffect(() => {
  //   if (isCreated && btnClicked) navigate("/", { replace: true });
  // }, [isCreated, btnClicked]);

  useEffect(() => {
    const urls = postImg.map((file) => URL.createObjectURL(file));
    setPreviewImg(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [postImg]);

  const handleSubmit = () => {
    setBtnClicked(true);
    const newPost = {
      author: email,
      displayName,
      content,
      images: postImg,
    };
    // dispatch(postCreate(newPost));
  };

  const isText = content === "";

  return isLoggedIn ? (
    <CreateBox>
      <HeadBox>
        <ArrowBackIosNew />
        <Button onClick={handleSubmit} disabled={isText} variant="contained" size="small">
          게시하기
        </Button>
      </HeadBox>
      <ImageList sx={{ width: 300, height: 60 }} cols={5} rowHeight={60}>
        {previewImg.map((url, index) => (
          <Zoom key={url} in={true} timeout={index * 100}>
            <ImageListItem key={url}>
              <PreviewImage srcSet={url} src={url} alt={`미리보기`} loading="lazy" />
            </ImageListItem>
          </Zoom>
        ))}
      </ImageList>
      <ContentBox>
        <IconButton component="label" sx={{ paddingTop: "4px" }}>
          <ImageIcon fontSize="inherit" />
          <VisuallyHiddenInput accept="image/*" multiple onChange={uploadImage} type="file" />
        </IconButton>
        <TextField
          variant="standard"
          placeholder="피드 업데이트"
          multiline
          fullWidth
          value={content}
          onChange={handleInput}
          InputProps={{
            disableUnderline: true, // border 제거
          }}
        />
      </ContentBox>
    </CreateBox>
  ) : (
    <LogInAlertContainer>
      <LogInAlertBox>
        <LockOutlinedIcon color="primary" />
        <Typography>로그인 해주세요</Typography>
        <Button component={Link} to="/login" type="submit" fullWidth variant="contained">
          로그인
        </Button>
      </LogInAlertBox>
    </LogInAlertContainer>
  );
};

export default Create;

const LogInAlertContainer = styled(Container)({
  height: "calc(100vh - 56px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const LogInAlertBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "15px",
  gap: "10px",
  padding: "30px",
  backgroundColor: "#e5f6fd",
});

const CreateBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const HeadBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const ContentBox = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  width: "100%",
  gap: "10px",
});

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

const PreviewImage = styled("img")({
  width: "100%",
  height: "60px",
  objectFit: "cover",
});
