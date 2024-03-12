import React, { useRef, useState } from 'react'

export default function Picture({readablePicture,setPicture,setReadablePicture}) {
  const inputRef=useRef();
  const [error,setError] = useState('');
  function handlePicture(e){
    let pic = e.target.files[0];
    if(pic.type !== "image/jpg" && pic.type !== "image/jpeg" && pic.type !== "image/png" && pic.type !== "image/webp"){
      setError('image type png | jpg | jpeg | webp');
      return;
    }else{
      setError('');
      setPicture(pic);
      let reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload =  (e)=>{
        setReadablePicture(e.target.result)
      }
    }
  }
  const handleClick = ()=>{
    setPicture("");
    setReadablePicture("");
  }
  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
      <label htmlFor='picture' className='text-sm font-bold tracking-wide'>الصورة (اختياري)</label>
      {readablePicture ? 
        (
          <div>
            <img src={readablePicture}  alt="user picture" className='w-20 h-20 object-cover rounded-full'/>
            <div className='w-20 dark:bg-dark_bg_3 rounded-m font-bold flex py-1 items-center  justify-center cursor-pointer' onClick={handleClick}>Remove</div>
          </div>
        ):(
          <div className="w-full h-12 dark:bg-dark_bg_3 rounded-m font-bold flex items-center justify-center cursor-pointer"
          onClick={()=> inputRef.current.click()}
           >اختر صورة</div>
        )  
    }
    <p className='text-red-500'>{error}</p>
    <input type="file" name="picture" id="picture" hidden ref={inputRef} accept='image/png image/jpg image/jpeg image/webp' onChange={handlePicture}/>
    </div>
  )
}
