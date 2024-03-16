import React from 'react'
import QuestionList from '../components/questions/QuestionList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Question() {
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.user);
  if(!user){
    navigate("/login");
    return;
  }
  const {token,role} = user;
  try{
    if(user && user?.role){
      if(user.role !== "admin"){
        navigate("/");
        return;
      }
    }
  }catch(err){console.log(err)}
  return (
    <div className='dark:bg-dark_bg_1 min-h-screen'>
      <QuestionList/>
    </div>
  )
}
