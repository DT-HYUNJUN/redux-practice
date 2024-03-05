import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../fbase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface AuthState {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  isLoggedIn: boolean;
  isDeleted: boolean;
}

const initialState: AuthState = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  isLoggedIn: false,
  isDeleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkUser: (state, action: PayloadAction<AuthState>) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.photoURL = action.payload.photoURL;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(signUpAsync.pending, () => {
        console.log("pending");
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const { uid, displayName, email } = action.payload!;
        state.uid = uid;
        state.displayName = displayName;
        state.email = email;
        state.isLoggedIn = true;
        console.log("fulfilled");
      })
      // 로그인
      .addCase(logInAsync.pending, () => {
        console.log("pending");
      })
      .addCase(logInAsync.fulfilled, (state, action) => {
        const { uid, displayName, email } = action.payload!;
        state.uid = uid;
        state.displayName = displayName;
        state.email = email;
        state.isLoggedIn = true;
        console.log("fulfilled");
      })
      // 로그아웃
      .addCase(logOutAsync.pending, () => {
        console.log("pending");
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        console.log("fulfilled");
      })
      // 회원탈퇴
      .addCase(deleteUserAsync.pending, (state) => {
        console.log("pending");
        state.isDeleted = false;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.isDeleted = true;
        console.log("user deleted");
      })
      // 회원수정
      .addCase(updateUserAsync.pending, (state) => {
        console.log("pending");
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
        console.log("user updated");
      });
  },
});

// 회원가입
export const signUpAsync = createAsyncThunk("auth/signUpAsync", async (credentials: { displayName: string; email: string; password: string }) => {
  const { displayName, email, password } = credentials;
  let data;
  try {
    data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(data.user, { displayName });
    return {
      uid: data.user.uid,
      displayName: data.user.displayName!,
      email: data.user.email!,
    };
  } catch (error) {
    console.log(error);
  }
});

// 로그인
export const logInAsync = createAsyncThunk("auth/loginAsync", async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;
  let data;
  try {
    data = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: data.user.uid,
      displayName: data.user.displayName!,
      email: data.user.email!,
    };
  } catch (error) {
    console.log(error);
  }
});

// 로그아웃
export const logOutAsync = createAsyncThunk("auth/logOutAsync", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
});

// 회원탈퇴
export const deleteUserAsync = createAsyncThunk("auth/deleteUserAsync", async (displayName: string) => {
  try {
    await deleteUser(auth.currentUser);
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("displayName", "==", displayName));
    const queryDocs = await getDocs(q);

    queryDocs.forEach(async (queryDoc) => {
      await deleteDoc(doc(db, "posts", `${queryDoc.data().id}`));
    });
  } catch (error) {
    console.log(error);
  }
});

// 회원수정
export const updateUserAsync = createAsyncThunk("auth/updateUserAsync", async (updatedProfile: { email: string; newDisplayName: string; profileImg?: File }) => {
  const auth = getAuth();

  try {
    if (updatedProfile.profileImg) {
      const filePath = `images/profile/${updatedProfile.email}/${updatedProfile.profileImg.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, updatedProfile.profileImg);
      const downloadURL = await getDownloadURL(storageRef);
      updateProfile(auth.currentUser, {
        displayName: updatedProfile.newDisplayName,
        photoURL: downloadURL,
      });
      return {
        displayName: updatedProfile.newDisplayName,
        photoURL: downloadURL,
      };
    } else {
      updateProfile(auth.currentUser, {
        displayName: updatedProfile.newDisplayName,
      });
      return {
        displayName: updatedProfile.newDisplayName,
      };
    }
  } catch (error) {
    console.log(error);
  }
});

export const { checkUser } = authSlice.actions;

export default authSlice.reducer;
