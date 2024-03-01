import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fbase";

interface PostState {
  id: number;
  author: string;
  content: string;
  isCreated: boolean;
}

const getPostLength = async (): Promise<number> => {
  const docRef = doc(db, "posts", "metadata");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData.length;
    } else return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

let initialId: number = await getPostLength();

const initialState: PostState = {
  id: initialId,
  author: "",
  content: "",
  isCreated: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCreate.pending, (state) => {
        console.log("post creating");
        state.isCreated = false;
      })
      .addCase(postCreate.fulfilled, (state) => {
        console.log("post created");
        state.isCreated = true;
      });
  },
});

// post 작성
export const postCreate = createAsyncThunk("post/create", async (post: { author: string; content: string }) => {
  const { author, content } = post;

  const currentPostLength = await getPostLength();

  const newPost = {
    id: currentPostLength + 1,
    author,
    content,
  };

  const docRef = collection(db, "posts");
  try {
    await setDoc(doc(docRef, `${currentPostLength + 1}`), newPost);
    await updateDoc(doc(docRef, "metadata"), {
      length: currentPostLength + 1,
    });
  } catch (error) {
    console.log(error);
  }
});

export default postSlice.reducer;
