import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { db } from "../fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import PostItem from "./PostItem";
import { IPost } from "../types";

const PostList = () => {
  const [list, setList] = useState<IPost[]>([]);

  // const q = query(collection(db, "posts"), orderBy("id", "desc"));
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const posts: IPost[] = [];
  //   querySnapshot.forEach((doc) => {
  //     posts.push(doc.data() as IPost);
  //   });
  //   setList(posts);
  // });

  // useEffect(() => {
  //   onSnapshot(query(collection(db, "posts"), orderBy("id", "desc")), (snapshot) => {
  //     const tempArr: IPost[] = [];
  //     snapshot.docs.map((doc) => tempArr.push(doc.data() as IPost));
  //     setList(tempArr);
  //   });
  // }, []);

  useEffect(() => {}, []);

  return (
    <Stack spacing={4}>
      {list.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostList;
