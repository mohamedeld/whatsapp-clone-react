import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getTimeAgo from '../../utils/getTimeStamp';
import { openCreateConversation } from '../../features/chatSlice';
import findPerson, { findPersonName, findPersonPicture } from '../../utils/findPerson';
import SocketContext from '../../context/SocketContext';
function Conversations({ item,socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const { token } = user;
  
  let element={};
  try{
    if(item){
      element = item;
    }
  }catch(err){
    console.log(err);
  }
 
  let values={};
  try{
    if(user && element && element.users){
      values = {
        recevierId:findPerson(user,element.users),
        token
      }
    }
  }catch(err){
    console.log(err);
  }
   
  
  let active={};
  try{
    if(activeConversation){
      active = activeConversation;
    }
  }catch(err){console.log(err)}

  const openConversation = async () => {
  let newConvo=  await dispatch(openCreateConversation(values))
    await socket.emit("join conversation",newConvo.payload._id);
  }
  return (


    <li
      onClick={() => openConversation()}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1
      hover:${
        element._id !== active._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        element._id === active._id ? "dark:bg-dark_hover_1" : "" 
      }`}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/*Left*/}
        <div className="flex items-center gap-x-3">
          {/*Conversation user picture*/}
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden`}
          >
            <img
              src={
                findPersonPicture(user,element.users)
              }
              alt={element.name}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-full flex flex-col">
            {/*Conversation name*/}
            <h1 className="font-bold flex items-center gap-x-2 dark:text-white">
              {findPersonName(user,element.users)}
            </h1>
            {/* conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{item.latestMessage ? item.latestMessage.message.length > 25 ? `${item.latestMessage.message.subString(0,25)}...`:item.latestMessage.message : ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">{element?.latestMessage?.createdAt? getTimeAgo(element?.latestMessage?.createdAt):''}</span>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  )
}

const ConversationSocket = (props)=>{
  return (
    <SocketContext.Consumer>
      {(socket)=> <Conversations {...props} socket={socket}/>}
    </SocketContext.Consumer>
  )
}
export default ConversationSocket;