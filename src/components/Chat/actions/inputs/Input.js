import React from 'react'

export default function Input({message,handleMessage}) {
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pr-4"
        placeholder="ابدء الدردشة" 
          value={message}
          onChange={handleMessage}
        />
    </div>
  )
}
