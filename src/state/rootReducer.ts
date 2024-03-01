import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export default rootReducer;
