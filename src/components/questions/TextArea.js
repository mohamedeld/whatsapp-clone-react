import React from 'react'

export default function TextArea({name,id,placeholder,error,register,label}) {
  return (
    <div className=' mt-8 content-center dark:text-dark_text_1 space-y-1 '>
      <label htmlFor={id} className='text-sm font-bold tracking-wide'>{label}</label> 
      <textarea className='w-full h-24 dark:bg-dark_bg_3 text-base outline-none py-2 px-4 rounded-lg' id={id} name={name} placeholder={placeholder} {...register("description")} />
      {error && <p className='text-red-500'>{error}</p>}
      </div>
  )
}
