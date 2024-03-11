import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/userSlice';
import Picture from './Picture';
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
    let response = await dispatch(registerUser({...data,picture:""}));
  if(response.payload.status === "success"){
    navigate("/");
  }
  }
  return (
    <div className='h-screen w-full flex justify-center items-center overflow-hidden'>
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded'>
        <div className="text-center dark:text-dark_text_1">
          <h2 className='mt-6 text-3xl font-bold'>Welcome back</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
          id="name"
          label="Full Name"
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
          id="name"
          label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
          id="status"
          label="Status"
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <Picture readablePicture={readablePicture}/>
          <AuthInput
          id="password"
          label="Password"
            name="password"
            type="password"
            placeholder="Your Password"
            register={register}
            error={errors?.password?.message}
          />

          <button type="submit"
            className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
          >
            {status === "loading" ? "Registering":"Sign up"}
          </button>
        </form>
        <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1 gap-1'>
          <span>Have an account?</span>
          <Link to={"/login"} className='dark:text-dark_text_1 hover:underline cursor-pointer'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
