import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../fbase";
import { onAuthStateChanged } from "firebase/auth";

interface PostState {
  id: number;
  author: string;
  content: string;
}

const getPostLength = async (email: string) => {
  const docRef = doc(db, "posts", email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return Object.keys(docData).length;
    } else return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

let initialId: number = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    initialId = await getPostLength(user.email!);
  }
});

const initialState: PostState = {
  id: initialId,
  author: "",
  content: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// post 작성
export const postCreate = createAsyncThunk("post/create", async (post: { author: string; content: string }) => {
  const { author, content } = post;

  const currentPostLength = await getPostLength(author);

  const newPost = {
    id: currentPostLength + 1,
    author,
    content,
  };

  try {
    await setDoc(doc(db, "posts", `${currentPostLength + 1}`), newPost);
  } catch (error) {
    console.log(error);
  }
});

export default postSlice.reducer;
