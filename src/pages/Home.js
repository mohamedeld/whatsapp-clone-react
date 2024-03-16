import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home() {
  
  return (
    <div className='h-screen dark:bg-dark_bg_1 w-full flex flex-col justify-center items-center'>
      
      <img src="/cofee.png" alt="caffee image" className='w-52 h-52 object-cover' />
      <h1 className='dark:text-white font-bold text-2xl py-2 mb-5'>ريسكا كافيه</h1>
      <Link to="/add-question" className='flex justify-center bg-green_1 text-gray-100 p-3 md:p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'>اضافة شكوي</Link>
    </div>
  )
}
