import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import chatSlice from "../features/chatSlice";

const rootReducer = combineReducers({
  user:userSlice,
  chat:chatSlice
});

export default rootReducer