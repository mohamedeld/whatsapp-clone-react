import React from 'react'

export default function AuthInput({id,label,name,type,placeholder,register,error}) {
  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
      <label htmlFor={id} className='text-sm font-bold tracking-wide'>{label}</label> 
      <input type={type} name={name} {...register(name)} className='w-full dark:bg-dark_bg_3 text-base outline-none py-2 px-4 rounded-lg' placeholder={placeholder}/>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
