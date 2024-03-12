import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeStatus, registerUser } from '../../features/userSlice';
import Picture from './Picture';
import axios from 'axios';

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const cloudSecret = process.env.REACT_APP_CLOUD_SECRET;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status,error} = useSelector(state=> state.user);
  const [picture,setPicture] = useState();
  const [readablePicture,setReadablePicture] = useState("");
  const {register,handleSubmit,formState:{
    errors
  }} = useForm({
    resolver:yupResolver(signUpSchema)
  });
  
  const onSubmit = async (data)=> {
    
    dispatch(changeStatus('loading'));
    if(picture){
      // upload image to cloundary
      await uploadImage().then(async(res)=>{
        
        let  response = await dispatch(registerUser({...data,picture:res.secure_url }));
        if(response.payload.status === "success"){
          navigate("/login");
        }
      })
    }else{
      let response = await dispatch(registerUser({...data,picture:""}));
      if(response.payload.status === "success"){
        navigate("/login");
      }
      }
    
  }
   const uploadImage = async ()=>{
    let formData = new FormData();
    formData.append("upload_preset",cloudSecret);
    formData.append("file",picture);
    const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData);
    return data;
  }
  return (
    <div className='min-h-screen w-full flex justify-center items-center overflow-hidden'>
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded'>
        <div className="text-center dark:text-dark_text_1">
          <h2 className='mt-6 text-3xl font-bold'>اهلا بيك في ريسكا كافيه</h2>
          <p className="mt-2 text-sm">تسجيل حساب جديد</p>
        </div>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
          id="name"
          label="الاسم بالكامل"
            name="name"
            type="text"
            placeholder="ادخل اسمك بالكامل"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
          id="email"
          label="الايميل"
            name="email"
            type="email"
            placeholder="ادخل الايميل الخاص بك"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
          id="status"
          label="الحالة"
            name="status"
            type="text"
            placeholder="الحالة (اختياري)"
            register={register}
            error={errors?.status?.message}
          />
          
          <AuthInput
          id="password"
          label="كلمة السر"
            name="password"
            type="password"
            placeholder="ادخل كلمة السر"
            register={register}
            error={errors?.password?.message}
          />
            <Picture readablePicture={readablePicture} setPicture={setPicture} setReadablePicture={setReadablePicture}/>  
          <button type="submit"
            className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
          >
            {status === "loading" ? "جاري المعالجة":"انشاء حساب"}
          </button>
        </form>
        <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1 gap-1'>
          <span>هل لديك حساب ؟</span>
          <Link to={"/login"} className='dark:text-dark_text_1 hover:underline cursor-pointer'>تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  )
}
