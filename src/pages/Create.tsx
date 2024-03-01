import React, { useEffect, useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { postCreate } from "../state/post/postSlice";
import { AppDispatch, RootState } from "../state/store";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [content, setContent] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);
  const isCreated = useSelector((state: RootState) => state.post.isCreated);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isCreated && btnClicked) navigate("/", { replace: true });
  }, [isCreated, btnClicked]);

  const handleSubmit = () => {
    setBtnClicked(true);
    const newPost = {
      author: email,
      content,
    };
    dispatch(postCreate(newPost));
  };

  const isText = content === "";

  return (
    <CreateBox>
      <HeadBox>
        <ArrowBackIosNew />
        <Button onClick={handleSubmit} disabled={isText} variant="contained" size="small">
          게시하기
        </Button>
      </HeadBox>
      <ContentBox>
        <ProfileImageBox>
          <AccountCircleIcon fontSize="large" />
        </ProfileImageBox>
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
  );
};

export default Create;

const CreateBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  gap: "40px",
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

const ProfileImageBox = styled(Box)({});
