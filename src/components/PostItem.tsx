import React from "react";
import { IPost } from "../types";
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography, styled } from "@mui/material";
import Zoom from "@mui/material/Zoom";

interface Props {
  post: IPost;
  timeout: number;
}

const PostItem = (props: Props) => {
  return (
    <Zoom in={true} timeout={props.timeout}>
      <Card elevation={8} sx={{ maxWidth: 250 }}>
        <CardHeader avatar={<Avatar sx={{ bgcolor: "#23ffff" }}>{props.post.author.at(0)}</Avatar>} title={<Typography>{props.post.author}</Typography>} />
        <CardActionArea>
          <CardMedia component="img" height="194" />
          <CardContent>
            <MyCardContent>
              <Typography sx={{ wordWrap: "break-word" }} whiteSpace={"pre-line"} variant="body2" color="text.secondary">
                {props.post.content}
              </Typography>
            </MyCardContent>
          </CardContent>
        </CardActionArea>
      </Card>
    </Zoom>
  );
};

export default PostItem;

const MyCardContent = styled(Box)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
});
