import React from 'react'
import { CallIcon, DotsIcon, SearchLargeIcon } from '../../../svgandicons/svg'
import { useSelector } from 'react-redux';
import VideoCallIcon from '../../../svgandicons/svg/VideoCallIcon';
import RightArrowIcon from '../../../svgandicons/svg/RightArrowIcon';
import { setActiveConversation } from '../../../features/chatSlice';
import { useOpen } from '../../../context/OpenChatContext';

export default function ChatHeader() {
  const {open,setOpen} = useOpen();
  function handleOpen(){
    setOpen(false);
  }
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  let active={};
  try{
    if(activeConversation){
      active = activeConversation;
    }
  }catch(err){console.log(err)}
  const {name,picture} = active;
  
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
    {/*Container*/}
    <div className="w-full flex items-center justify-between">
      {/*left*/}
      <div className="flex items-center gap-x-4">
      <div onClick={handleOpen}>
      <RightArrowIcon className="fill-white cursor-pointer"/>
      </div>
        {/*Conversation image*/}
        <button className="btn">
          <img
            src={picture}
            alt={`${name} picture`}
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/*Conversation name and online status*/}
        <div className="flex flex-col">
          <h1 className="dark:text-white text-md font-bold">
            {name}
          </h1>
          <span className="text-xs dark:text-dark_svg_2">
            متاح حاليا
          </span>
        </div>
      </div>
      {/*Right*/}
      <ul className="flex items-center gap-x-2.5">
        {/* {1 == 1 ? (
          <li >
            <button className="btn">
              <VideoCallIcon />
            </button>
          </li>
        ) : null}
        {1 == 1 ? (
          <li>
            <button className="btn">
              <CallIcon />
            </button>
          </li>
        ) : null} */}
        {/* <li>
          <button className="btn">
            <SearchLargeIcon className="dark:fill-dark_svg_1" />
          </button>
        </li> */}
        <li>
          <button className="btn">
            <DotsIcon className="dark:fill-dark_svg_1" />
          </button>
        </li>
      </ul>
    </div>
  </div>
  )
}
