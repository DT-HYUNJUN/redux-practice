import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, styled } from "@mui/material";
import { getPosts } from "../utils/getPosts";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IPost } from "../types";
import Slider from "react-slick";

interface Props {
  post: {
    id: number;
    name: string;
    content: string;
    imagesCount: number;
    date: number;
  };
}

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 100,
};

const UserPost = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const displayName = useSelector((state: RootState) => state.auth.displayName);

  // getPosts(displayName).then((res) => setPosts(res));
  return (
    <div>
      <Box component="div" p={2} height={200} sx={{ bgcolor: "white", borderRadius: "12px" }} onClick={handleOpen}>
        <div>{props.post.name}</div>
        <img style={{ backgroundColor: "black", width: "300px" }} src="#" alt="#" />
        <div>{props.post.content}</div>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Card elevation={8} sx={{ width: 300, height: 540, bgcolor: "#e8f2ff" }}>
          {props.post.imagesCount > 0 ? (
            <Slider {...settings}>
              {[0, 1, 2, 3, 4].map((item) => {
                const imageProp = `image${item}`;
                return props.post[imageProp] ? (
                  <div key={item}>
                    <CardMedia component="img" image={props.post[imageProp]} height="380" />
                    {/* <IconButton
                sx={{ position: "fixed", bottom: 0, right: `calc(320px * (${props.post.imagesCount} - ${item + 1}))` }}
                onClick={() => handleOpen(item)}
                onTouchStart={() => handleOpen(item)}
              >
                <FullscreenIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton> */}
                  </div>
                ) : null;
              })}
            </Slider>
          ) : (
            <Box height={380} sx={{ bgcolor: "black" }} />
          )}

          <CardContent sx={{ height: "94px" }}>
            <MyCardContent>
              <Typography sx={{ wordWrap: "break-word" }} whiteSpace={"pre-line"} variant="body2">
                {props.post.content}
              </Typography>
            </MyCardContent>
          </CardContent>
          <CardActions sx={{ paddingLeft: "16px" }}>
            <Typography variant="caption" color="text.secondary">{`${new Date(props.post.date).getFullYear()}년 ${new Date(props.post.date).getMonth() + 1}월 ${new Date(
              props.post.date
            ).getDate()}일`}</Typography>
          </CardActions>
          {/* {open.map((isOpen, index) => (
        <Backdrop key={index} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen} onClick={() => handleClose(index)} onTouchStart={() => handleClose(index)}>
          {props.post[`image${index}`] && <img width={370} src={props.post[`image${index}`]} alt={`${index}`} />}
        </Backdrop>
      ))} */}
        </Card>
      </Dialog>
    </div>
  );
};

export default UserPost;

const UserPostsBox = styled(Box)({});

const MyCardContent = styled(Box)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
});
