import React, { useEffect, useRef, useState } from "react";
import { IPost } from "../types";
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, styled } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Backdrop from "@mui/material/Backdrop";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

interface Props {
  post: IPost;
  timeout: number;
}

const PostItem = (props: Props) => {
  const [open, setOpen] = useState([false, false, false, false, false]);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = (index: number) => {
    setOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      console.log("Open", index, updatedState);
      setIsClicked(true);
      return updatedState;
    });
  };

  const handleClose = (index: number) => {
    isClicked &&
      setOpen((prevState) => {
        const updatedState = [...prevState];
        updatedState[index] = false;
        console.log("Close", index, updatedState);
        setIsClicked(false);
        return updatedState;
      });
  };

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 100,
  };

  return (
    <Card elevation={8} sx={{ width: 320, height: 540, borderRadius: "12px", bgcolor: "#e8f2ff" }}>
      <CardHeader sx={{ padding: 1 }} avatar={<Avatar sx={{ bgcolor: "#23ffff" }}>{props.post.displayName?.at(0)}</Avatar>} title={<Typography>{props.post.displayName}</Typography>} />
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
        <Typography variant="caption" color="text.secondary">{`${new Date(props.post.date).getFullYear()}년 ${new Date(props.post.date).getMonth() + 1}월 ${new Date(
          props.post.date
        ).getDate()}일`}</Typography>
      </CardContent>
      {/* {open.map((isOpen, index) => (
        <Backdrop key={index} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen} onClick={() => handleClose(index)} onTouchStart={() => handleClose(index)}>
          {props.post[`image${index}`] && <img width={370} src={props.post[`image${index}`]} alt={`${index}`} />}
        </Backdrop>
      ))} */}
    </Card>
  );
};

export default PostItem;

const MyCardContent = styled(Box)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
});

const ImageCardMedia = styled(CardMedia)({
  objectFit: "cover",
  height: "194px",
});
