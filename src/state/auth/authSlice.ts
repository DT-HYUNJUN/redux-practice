import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../fbase";

interface AuthState {
  uid: string;
  displayName: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  uid: "",
  displayName: "",
  email: "",
  isLoggedIn: false,
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
export const logOutAsync = createAsyncThunk("logOutAsync", async () => {
  await signOut(auth);
});

export const { checkUser } = authSlice.actions;

export default authSlice.reducer;
