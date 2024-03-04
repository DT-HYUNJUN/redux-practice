import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../fbase";
import { IPost } from "../types";

export const getPosts = async (displayName: string) => {
  // const postsRef = collection(db, "posts");
  // const userPosts: IPost[] = [];
  // try {
  //   const q = query(postsRef, where("displayName", "==", displayName));
  //   const queryDocs = await getDocs(q);
  //   queryDocs.forEach(async (queryDoc) => {
  //     userPosts.push(queryDoc.data() as IPost);
  //   });
  //   return userPosts;
  // } catch (error) {
  //   console.log(error);
  // }
};
