import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { logout } from '../features/userSlice';

export default function Chat() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.user);
  useEffect(()=>{
    if(user){
      dispatch(getConversations(user.token))
    }
  },[user])
  function handlelogout(){
    dispatch(logout())
  }
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*Sidebar*/}
          <Sidebar/>
        </div>
        <button onClick={()=>handlelogout()}>logout</button>
      </div>
  )
}
