
import React from 'react'
import { useSelector } from 'react-redux'
import Conversations from '../../conversations/Conversations';

export default function Conversation() {
  const {conversations} = useSelector(state=> state.chat);

  let allConversation=[];
  try{  
    if(conversations){
      allConversation = conversations;
    }    
  }catch(err){
    console.log(err);
  }
  
  return (
    <div className='convos scrollbar pr-5'>
      {allConversation ? allConversation.filter(ele=> ele.latestMessage).map(item=>{
        return (
          <Conversations key={item._id} item={item}/>
        )
      }):<p>لا يوجد دردشات حتي الان</p>}
    </div>
  )
}
