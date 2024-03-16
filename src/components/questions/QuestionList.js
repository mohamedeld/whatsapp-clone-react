import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../../features/questionSlice';
import DefaultPage from '../conversations/DefaultPage';
import QuestionItem from './QuestionItem';
import LoadingPage from '../LoadingPage';

export default function QuestionList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const user = useSelector(state=> state.user);
  if(!user){
    navigate('/login');
  }
  const {role,token} = user;
  // let userRole = '';
  // try{
  //   if(user && user.role  && role === "admin"){
  //     userRole = user.role;
  //   }
  // }catch(err){console.log("error ",err)}
  // useEffect(()=>{
  //   if(userRole !== "admin"){
  //     navigate("/");
  //     return;
  //   }
  // },[])
  let tokenUser='';
  try{
    if(user?.user?.token){
      tokenUser = user?.user?.token
    }
  }catch(err){console.log("err ",err)}
 
  async function getAllQuestions(){
    try{
      setLoading(true);
    await dispatch(getQuestions({ token:tokenUser}))
    setLoading(false);
    }catch(err){console.log(err)}
  }
  useEffect(()=>{
    getAllQuestions()
  },[])
  const questions = useSelector(state=> state.question);
  
  let allQuestions =[];
  try{
    if(loading === false && questions && questions.question.length > 0){
      allQuestions = questions.question;
    }
  }catch(err){console.log(err)}
  console.log(allQuestions);
  return (
    <div>
      <div className='pt-10 flex justify-center items-center text-xl dark:text-white'>كل الشكاوي</div>
     
      {loading === false && allQuestions? allQuestions.map(item=>{
        return (
          <QuestionItem key={item._id} item={item}/>
        )
      }) : <DefaultPage title="ريسكا كافيه" description="لا يوجد شكاوي حتي الان"/>}
    </div>
  )
}
