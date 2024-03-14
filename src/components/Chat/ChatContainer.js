import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConversationMessage } from '../../features/chatSlice';
import ChatHeader from './header/ChatHeader';
import ChatMessage from './messages/ChatMessage';

export default function ChatContainer() {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const { activeConversation,messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  if(!user){
    navigate("/")
  }
  const {token} = user;
  let active={};
  try{
    if(activeConversation && activeConversation.existedConversation){
      active = activeConversation.existedConversation;
    }
  }catch(err){console.log(err)}
  let values={};
  try{
    if(user && active && active._id){
      values = {
        convId:active?._id,
        token
      }
    }
  }catch(error){console.log(error)}
  async function getMessages(){
    await dispatch(getConversationMessage(values))
  }
  useEffect(()=>{
    if(active?._id){
      getMessages()
    }
  },[active])
  
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      {/*Container*/}
      {/* chat header */}
      <ChatHeader/>
        {/* chat message */}
        <ChatMessage/>
      <div>
      </div>
    </div>
  )
}
