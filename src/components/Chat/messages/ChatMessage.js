import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message';
import { useNavigate } from 'react-router-dom';

export default function ChatMessage() {
  const navigate = useNavigate();
  const {messages} = useSelector(state=> state.chat);
  const {user} = useSelector(state=> state.user);
  const endRef = useRef();
  function scrollToBottom(){
    endRef.current.scrollIntoView({behaviour:"smooth"}) 

  }
  useEffect(()=>{
    scrollToBottom();
  },[messages])
  if(!user){
    navigate("/login");
  }

  let allMessages=[];
  try{
    if(messages){
      allMessages = messages;
    }
  }catch(err){console.log(err)}
  
  return (
    <div
    className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
  bg-cover bg-no-repeat
  "
  >
     <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/*Messages*/}
        {allMessages ? allMessages.map(item=>{
          return (
            <Message key={item._id} message={item}  me={user && item && user._id === item.sender._id}/>
          )
        }) :null }
        <div className='mt-2' ref={endRef}></div>
        </div>
  </div>
  )
}
