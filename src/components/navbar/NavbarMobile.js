// Navbar.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";
import MenuIcon from "../../svgandicons/svg/MenuIcon";
import { CloseIcon } from "../../svgandicons/svg";

const NavbarMobile = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.user);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  if(!user){
    navigate("/login");
    return;
  }
  const {token,role} = user;
  let activeUser="";
  try{
    if(user && user?.role){
      if(user.role === "admin"){
        activeUser = user.role;
      }
    }
  }catch(err){console.log(err)}
  function handleIsOpen(){
    setIsOpen(!isOpen);
  }
  async function Logout(){
    await dispatch(logout());
  }
  return (
    <div className="block md:hidden relative">
      <header className="w-full  py-5 dark:bg-green_4 flex  justify-between items-center dark:text-white px-5">
        <h1 className="flex items-center gap-2">
          <img src="/cofee.png" className="w-10 h-10 cursor-pointer object-cover" alt="image logo"/>
          <Link to="/" className="font-2xl font-bold">ريسكا كافيه</Link>
        
        </h1>
        <div onClick={handleIsOpen}>
            {isOpen === true ? <CloseIcon className="fill-white cursor-pointer" /> : <MenuIcon className="fill-white cursor-pointer"/>}
          </div>
       {isOpen&& <nav className="absolute top-0 right-0 z-50 h-screen w-[50%]  dark:bg-dark_bg_1 dark:text-white flex justify-center items-center">
          
          <ul className="flex flex-col list-none justify-between items-center gap-9 dark:text-white font-semibold">
            <li className="p-1 hover:bg-green_1 hover:p-1 hover:rounded ">
              <Link to="/">الرئيسية</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="p-1 hover:bg-green_4 hover:p-1 hover:rounded">
                  <Link to="/chat">الدردشات</Link>
                </li>
                {activeUser === "admin" ? <li>
                  <Link to="/questions" className="hover:bg-green_2 hover:p-1 hover:rounded">الشكاوي</Link>
                </li>:<li className="bg-green_2 p-3 rounded">
                  <Link to="/add-question">اضف شكوي</Link>
                </li>}
                <li className="bg-green_2 p-1 rounded">
                  <button onClick={Logout} className="border-none outline-none">تسجيل الخروج</button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login">تسجيل الدخول</Link>
                </li>
                <li>
                  <Link to="/register">انشئ حساب</Link>
                </li>
              </>
            )}
          </ul>
        </nav>}
      </header>
    </div>
  );
};

export default NavbarMobile;
