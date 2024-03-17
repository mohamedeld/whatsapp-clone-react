import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/userSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state=> state.user);
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(loginSchema)
  });
  const onSubmit = async (data)=>{
    const response = await dispatch(loginUser({...data}));
    console.log(response);
    if(response.payload.status === "success"){
      navigate("/")
    }else if(response.status === "failed"){
      console.log("something went wrong");
      return;
    }
  }
  return (
    <div className='h-screen w-full flex justify-center items-center overflow-hidden'>
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded'>
        <div className="text-center dark:text-dark_text_1">
          <h2 className='mt-6 text-3xl font-bold'>اهلا بعودتك</h2>
          <p className="mt-2 text-sm">تسجيل الدخول</p>
        </div>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="name"
          label="الايميل"
            name="email"
            type="email"
            placeholder="ادخل الايميل الخاص بك"
            register={register}
            error={errors?.email?.message}
          />
          
          <AuthInput
          id="password"
          label="كلمة السر"
            name="password"
            type="password"
            placeholder="ادخل كلمة السر الخاصه بايميلك"
            register={register}
            error={errors?.password?.message}
          />
          <button type="submit"
            className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
          >
            {status === "loading" ? "جاري المعالجة":"سجل الدخول"}
          </button>
        </form>
        <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1 gap-1'>
          <span>الا تمتك حساب؟</span>
          <Link to={"/register"} className='dark:text-dark_text_1 hover:underline cursor-pointer'>انشاء حساب جديد</Link>
        </p>
      </div>
    </div>
  )
}
