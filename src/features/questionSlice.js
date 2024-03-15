import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status:"",
  error:"",
  question:{
    title:"",
    description:"",
    userId:""
  }
}
const questionSlice = createSlice({
  name:"question",
  initialState,
  reducers:{
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  // extraReducers(builder){
  //   builder.addCase()
  // }
})

export const  {setStatus} = questionSlice.actions;
export default questionSlice.reducer;