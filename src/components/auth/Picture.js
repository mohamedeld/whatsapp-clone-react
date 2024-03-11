import React, { useRef } from 'react'

export default function Picture({readablePicture}) {
  const inputRef=useRef();
  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
      <label htmlFor='picture' className='text-sm font-bold tracking-wide'>Picture (Optional)</label>
      {readablePicture ? 
        (
          <div>
            <img src={readablePicture} alt="user picture"/>
          </div>
        ):(
          <div className="w-full h-12 dark:bg-dark_bg_3 rounded-m font-bold flex items-center justify-center cursor-pointer"
          onClick={()=> inputRef.current.click()}
           >Upload Image</div>
        )  
    }
    <input type="file" name="picture" id="picture" hidden ref={inputRef}/>
    </div>
  )
}
