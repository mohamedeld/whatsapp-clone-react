import React from 'react'

export default function DefaultPage() {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      
      <img src="/cofee.png" alt="caffee image" className='w-52 h-52 object-cover' />
      <h1 className='dark:text-white font-bold text-2xl py-2'>ريسكا كافيه</h1>
      <p className='dark:text-white '>اهلا بك في ريسكا كافيه ابدء محادثتك</p>
    </div>
  )
}
