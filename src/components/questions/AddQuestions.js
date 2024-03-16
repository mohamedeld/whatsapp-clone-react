import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { questionSchema } from '../../utils/questionSchema';
import AuthInput from '../auth/AuthInput';
import TextArea from './TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../features/questionSlice';
import { useNavigate } from 'react-router-dom';

export default function AddQuestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const {user} = useSelector(state=> state.user);
  if(!user){
    navigate("/login");
  }
  const {token} = user;
  
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(questionSchema)
  });
  
  const onSubmit = async (data)=>{
   
   const response= await dispatch(createQuestion({token, ...data}));
   if(response.meta.requestStatus === "fulfilled"){
    navigate("/")
   }else{
    console.log("something went wrong");
    return;
   }
  }
  
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center gap-2'>
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded'>
      <div className="text-center dark:text-dark_text_1">
          <h2 className='mt-6 text-3xl font-bold'>اضافة شكوي</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          <AuthInput
            name="title"
            id="title"
            type="text"
            placeholder="ادخل عنوان الشكوي"
            label="العنوان"
            register={register}
            error={errors?.title?.message}
          />
          <TextArea
          name="description"
          id="description"
          placeholder="اكتب شكواك"
           register={register}
           error={errors?.description?.message} />
           <input type="hidden" name="userId" id="userId" {...register("userId")} value={user._id} />
           <button type="submit" className=' flex justify-center bg-green_1 text-gray-100 p-3 md:p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'>
            اضف شكوي
           </button>
        </form>
      </div>
    </div>
  )
}
