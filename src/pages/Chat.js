import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { logout } from '../features/userSlice';
import DefaultPage from '../components/conversations/DefaultPage';
import ChatContainer from '../components/Chat/ChatContainer';

export default function Chat() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.user);
  const {activeConversation} = useSelector(state=> state.chat);
  useEffect(()=>{
    if(user){
      dispatch(getConversations(user.token))
    }
  },[user])
  let active={};
  try{
    if(activeConversation && activeConversation.existedConversation){
      active = activeConversation.existedConversation;
    }
  }catch(err){console.log(err)}
  function handlelogout(){
    dispatch(logout())
  }
  
    
  
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*Sidebar*/}
          <Sidebar/>
    {active && active._id ? (<>
      <ChatContainer/>
    </>): (<DefaultPage/>)}
        </div>
        
      </div>
  )
}
