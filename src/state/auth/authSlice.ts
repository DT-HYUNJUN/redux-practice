import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../fbase";

interface AuthState {
  uid: string;
  displayName: string;
  email: string;
  loading?: boolean;
}

const initialState: AuthState = {
  uid: "",
  displayName: "",
  email: "",
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkUser: (state, action: PayloadAction<AuthState>) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const { uid, displayName, email, loading } = action.payload!;
        state.uid = uid;
        state.displayName = displayName;
        state.email = email;
        state.loading = loading;
        console.log("fulfilled");
      });
  },
});

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
      loading: false,
    };
  } catch (error) {
    console.log(error);
  }
});

export const { checkUser } = authSlice.actions;

export default authSlice.reducer;
