import React from 'react'
import { useSelector } from 'react-redux'

export default function ChatMessage() {
  const {messages} = useSelector(state=> state.chat);
  let allMessages=[];
  try{
    if(messages){
      if(messages.data.messages){
        allMessages = messages.data.messages;
      }
    }
  }catch(err){console.log(err)}
  console.log(allMessages);
  return (
    <div
    className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
  bg-cover bg-no-repeat
  "
  >
     <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/*Messages*/}
        </div>
  </div>
  )
}
