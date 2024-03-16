import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import chatSlice from "../features/chatSlice";
import questionSlice from "../features/questionSlice";

const rootReducer = combineReducers({
  user:userSlice,
  chat:chatSlice,
  question:questionSlice
});

export default rootReducer