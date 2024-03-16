import React from 'react'

export default function DefaultPage({title,description}) {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      
      <img src="/cofee.png" alt="caffee image" className='w-52 h-52 object-cover' />
      <h1 className='dark:text-white font-bold text-2xl py-2'>{title}</h1>
      <p className='dark:text-white '>{description}</p>
    </div>
  )
}
