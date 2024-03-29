import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/userSlice';

export default function Menu({setShowCreateGroup}) {
  const dispatch =useDispatch();
  
  return (
    <div className="absolute left-1 md:right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
        <ul>
          <li
            className="py-3 pr-5 cursor-pointer hover:bg-dark_bg_3"
            onClick={() => setShowCreateGroup(true)}
          >
            <span>انشاء مجموعة جديد</span>
          </li>
          <li className="py-3 pr-5 cursor-pointer hover:bg-dark_bg_3">
            <span>New community</span>
          </li>
          <li className="py-3 pr-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Starred messaged</span>
          </li>
          <li className="py-3 pr-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Settings</span>
          </li>
          <li
            className="py-3 pr-5 cursor-pointer hover:bg-dark_bg_3"
            onClick={() => dispatch(logout())}
          >
            <span>تسجيل الخروج</span>
          </li>
        </ul>
      </div>
  )
}
