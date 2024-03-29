import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fbase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

interface PostState {
  id: number;
  author: string;
  displayName: string;
  content: string;
  date: number;
  isCreated?: boolean;
  image0?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  imagesCount?: number;
  loading: boolean;
}

// const getPostLength = async (): Promise<number> => {
//   const docRef = doc(db, "posts", "metadata");
//   try {
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const docData = docSnap.data();
//       return docData.length;
//     } else return 0;
//   } catch (error) {
//     console.log(error);
//     return 0;
//   }
// };

// let initialId: number = await getPostLength();

const initialState: PostState = {
  id: 0,
  author: "",
  displayName: "",
  content: "",
  date: 0,
  isCreated: false,
  loading: false,
};

const currentPostLength = 0;

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
export const postCreate = createAsyncThunk("post/create", async (post: { author: string; displayName: string; content: string; images: File[] }) => {
  const { author, displayName, content, images } = post;

  // const currentPostLength = await getPostLength();

  const newPost: PostState = {
    id: currentPostLength + 1,
    author,
    displayName,
    content,
    date: new Date().getTime(),
    imagesCount: images.length,
    loading: false,
  };

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const imageURL = await uploadImage(file, currentPostLength + 1);
    let keyName = `image${i}`;
    newPost[keyName] = imageURL;
  }

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

// 이미지 업로드
const uploadImage = async (file: File, postId: number) => {
  const filePath = `images/${postId}/${file.name}`;
  try {
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log(error);
  }
};

export default postSlice.reducer;
