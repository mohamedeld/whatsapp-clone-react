import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const AUTH_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk("auth/register", async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${AUTH_ENDPOINT}/auth/register`, { ...values });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.error.message)
  }
})

export const loginUser = createAsyncThunk("auth/login", async (values, {rejectWithValue}) => {
  try {
    const { data } = await axios.post(`${AUTH_ENDPOINT}/auth/login`, { ...values });
    console.log(data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.error.message);
  }

})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "loading"
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.status = "successded";
      state.user = action.payload.data.user;
    }).addCase(registerUser.rejected, (action, state) => {
      state.status = "failed";
      state.error = action.payload;
    }).addCase(loginUser.pending, (state, action) => {
      state.status = "loading"
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.status = "successded";
      state.user = action.payload.data.user;
    }).addCase(loginUser.rejected, (action, state) => {
      state.status = "failed";
      state.error = action.payload;
    })
  }
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;