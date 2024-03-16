import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const QUESTION_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const initialState = {
  status:"",
  error:"",
  question:[]
}
export const createQuestion = createAsyncThunk("question/all",async(values,{rejectWithValue})=>{
  try{
    const {token,title,description,userId} = values;
    const {data} = await axios.post(`${QUESTION_ENDPOINT}/question`,{title,description,userId},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }catch(error){
    return rejectWithValue(error.response.data.error.message)
  }
})
export const getQuestions = createAsyncThunk("questions/allofThem",async(values,{rejectWithValue})=>{
  const {token} = values;
  
  try{
    const {data} = await axios.get(`${QUESTION_ENDPOINT}/question`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    
    
    return data;
  }catch(error){
    return rejectWithValue(error.response.data.error.message)
  }
})
export const deleteQuestion = createAsyncThunk("question/delete",async(values,{rejectWithValue})=>{
  try{
    const {token,questionId} = values;
    const {data} = await axios.delete(`${QUESTION_ENDPOINT}/question/${questionId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    
    
    return data;
  }catch(error){
    return rejectWithValue(error.response.data.error.message)
  }
})
const questionSlice = createSlice({
  name:"question",
  initialState,
  reducers:{
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder){
    builder.addCase(createQuestion.pending, (state,action)=>{
      state.status = "loading";
    }).addCase(createQuestion.fulfilled,(state,action)=>{
      state.status = "successded";
      state.question = [...state.question, action.payload];
    }).addCase(createQuestion.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    }).addCase(getQuestions.pending, (state,action)=>{
      state.status = "loading";
    }).addCase(getQuestions.fulfilled,(state,action)=>{
      state.status = "successded";
      state.question = action.payload;
    }).addCase(getQuestions.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    })
  }
})

export const  {setStatus} = questionSlice.actions;
export default questionSlice.reducer;