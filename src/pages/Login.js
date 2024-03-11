import React from 'react'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  return (
    <div className='h-screen dark:bg-dark_bg_1 flex justify-center items-center py-5 overflow-hidden'>
      <div className='flex w-[1600px] m-auto h-full'>
          <LoginForm/>
      </div>
    </div>
  )
}
