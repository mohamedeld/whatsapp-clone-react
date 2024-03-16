import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, updateMesage } from '../features/chatSlice';
import { logout } from '../features/userSlice';
import DefaultPage from '../components/conversations/DefaultPage';
import ChatContainer from '../components/Chat/ChatContainer';
import SocketContext from '../context/SocketContext';
import { useOpen } from '../context/OpenChatContext';

function Chat({ socket }) {

  const dispatch = useDispatch();
  const { open, setOpen } = useOpen();
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);

  async function getConvs() {
    if (user) {
      if (user?.token) {
        await dispatch(getConversations(user.token))
      }
      await socket.emit("join", user._id)
    }
  }

  useEffect(() => {
    getConvs()
  }, [user])
  let active = {};
  try {
    if (activeConversation) {
      active = activeConversation;
    }
  } catch (err) { console.log(err) }
  async function handlelogout() {
    await dispatch(logout())
  }
  async function updateSpecificMessage() {
    await socket.on("receive message", async (message) => {

      await dispatch(updateMesage(message));

    })
  }
  useEffect(() => {
    updateSpecificMessage()
  }, [])

  return (
    <div className="h-screen dark:bg-dark_bg_1 pt-6 flex items-center justify-center overflow-hidden ">
      {/*container*/}
      <div className="container h-screen md:flex py-[19px]">
        {/*Sidebar*/}
        {open === false && <Sidebar />}
        {open === true ? active && active._id ? (<>
          <ChatContainer />
        </>) : (<DefaultPage title="ريسكا كافية" description="اهلا بك في ريسكا كافيه ابدء دردشاتك" />) : ''}
      </div>

    </div>
  )
}

const ChatWithContext = (props) => {
  return (<SocketContext.Consumer>
    {(socket) => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>)
}

export default ChatWithContext;