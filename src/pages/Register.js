import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  return (
    <div className='min-h-screen dark:bg-dark_bg_1 flex justify-center items-center py-5 overflow-hidden'>
      <div className='flex w-[1600px] m-auto h-full'>
          <RegisterForm/>
      </div>
    </div>
  )
}
