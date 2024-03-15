import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from './EmojiPicker';
import Attachement from './attachements/Attachement';
import Input from './inputs/Input';
import { SendIcon } from '../../../svgandicons/svg';
import { sendMessage } from '../../../features/chatSlice';
import Loading from '../../Loading';
import SocketContext from '../../../context/SocketContext';

function ChatAction({socket}) {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [message,setMessage]= useState("");
  const [loading,setLoading] = useState(false);
  const { messages } = useSelector(state => state.chat);
  const { activeConversation,status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  let active={};
  try{
    if(activeConversation){
      active = activeConversation;
    }
  }catch(err){console.log(err)}
  
  if (!user) {
    navigate("/login");
  }
  const {token} = user;
  const values = {
    token,
    convoId:active._id,
    message,
    files:[]
  }
  function handleMessage(e){
    setMessage(e.target.value);
    
  }
  async function handleSendMessage(e){
    e.preventDefault();
    if(message === "" || message.length < 1){
      return;
    }
    setLoading(true); 
    let newMsg = await dispatch(sendMessage(values));
    await socket.emit("send message",newMsg.payload);
    
    setMessage('');
    setLoading(false);
  }
  return (
    <form onSubmit={handleSendMessage} className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachpments*/}
        <ul className="flex gap-x-2">
          <EmojiPicker/>
          <Attachement/>
        </ul>
        {/* input */}
        <Input message={message} handleMessage={handleMessage}/>
        <button type="submit" className="btn">
          {
            status === "loading" && loading === true ? (
              <Loading/>
            ) : (
              <SendIcon className="dark:fill-dark_svg_1" />
            )
          }
        </button>
      </div>
    </form>
  )
}

const ChatActionSocket = (props)=>{
  return (
    <SocketContext.Consumer>
      {(socket)=> <ChatAction {...props} socket={socket}/>}
    </SocketContext.Consumer>
  )
}

export default ChatActionSocket;