import React, {  useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchIcon,ReturnIcon, FilterIcon } from '../../../svgandicons/svg';
import axios from 'axios';
export default function Search({searchResult,setSearchResult}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {user} =useSelector(state=> state.user);
  const {token} = user;
  
  if(!user || !token){
    navigate("/login")
  }
  let searchLength=0;
  try{
    if(searchResult){
      if(searchResult.length > 0){
        searchLength = searchResult.length;
      }
    }
  }catch(err){console.log(err)}
  const handleSearch =async (e)=>{
    if(e.target.value && e.key === "Enter"){
      try{
        const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?keyword=${e.target.value}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        if(data){
          if(data.data.users){
            setSearchResult(data.data.users);
          }
        }
      }catch(error){
        console.log(error.response.data.error.message);
      }
    }else{
      setSearchResult([])
    }
  }
  

  return (
    <div className="h-[49px] py-1.5">
      {/*Container*/}
      <div className="px-[10px]">
        {/*Search input container*/}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
          {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="ابحث عن شخص للدردشة"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  )
}
