import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const CONVERSATION_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const initialState = {
  status:"",
  error:"",
  conversations:[],
  activeConversation:{},
  messages:[],
  notifications:[]
}

export const getConversations = createAsyncThunk("conversation/all",async (token,{rejectWithValue})=>{
  try{
    const {data} = await axios.get(`${CONVERSATION_ENDPOINT}/conversation`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return data
  }catch(error){
    return rejectWithValue(error.response.data.error.message)
  }
})

export const openCreateConversation = createAsyncThunk("conversation/create_open",async (values,{rejectWithValue})=>{
  try{
    const {recevierId,token} = values;
    const {data}= await axios.post(`${CONVERSATION_ENDPOINT}/conversation`,{recevierId},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }catch(error){
    console.log(error.response.data.error.message);
  }
})
export const getConversationMessage = createAsyncThunk("conversation/messages",async (values,{rejectWithValue})=>{
  try{
    const {convId,token} = values;
    const {data}= await axios.get(`${CONVERSATION_ENDPOINT}/message/${convId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return data;
  }catch(error){
    console.log(error.response.data.error.message);
  }
})

export const chatSlice = createSlice({
  name:'chat',
  initialState,
  reducers:{
    setActiveConversation:(state,action)=>{
      state.activeConversation = action.payload;
    }
  },
  extraReducers(builder){
    builder.addCase(getConversations.pending,(state,action)=>{
      state.status = "loading";
    }).addCase(getConversations.fulfilled,(state,action)=>{
      state.status = "successed";
      state.conversations = action.payload;
    }).addCase(getConversations.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    }).addCase(openCreateConversation.pending,(state,action)=>{
      state.status = "loading";
    }).addCase(openCreateConversation.fulfilled,(state,action)=>{
      state.status = "successed";
      state.activeConversation = action.payload;
    }).addCase(openCreateConversation.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    }).addCase(getConversationMessage.pending,(state,action)=>{
      state.status ="loading"
    }).addCase(getConversationMessage.fulfilled,(state,action)=>{
      state.messages = action.payload;
    }).addCase(getConversationMessage.rejected,(state,action)=>{
      state.status = "failed";
    })
  }
})

export const {setActiveConversation} = chatSlice.actions;
export default chatSlice.reducer;