// Navbar.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";

const Navbar = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.user);
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
  async function Logout(){
    await dispatch(logout());
  }
  return (
    <div className="hidden md:block">
      <header className="w-full  py-5 dark:bg-green_4 flex  justify-between items-center dark:text-white px-5">
        <h1 className="flex items-center gap-2">
          <img src="/cofee.png" className="w-10 h-10 cursor-pointer object-cover" alt="image logo"/>
          <Link to="/" className="font-2xl font-bold">ريسكا كافيه</Link>
      
        </h1>
        <nav className="">
          <ul className="flex list-none justify-between items-center gap-4 dark:text-white font-semibold">
            <li>
              <Link to="/">الرئيسية</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/chat">الدردشات</Link>
                </li>
                {activeUser === "admin" ? <li>
                  <Link to="/questions">الشكاوي</Link>
                </li>:<li className="bg-green_2 p-3 rounded">
                  <Link to="/add-question">اضف شكوي</Link>
                </li>}
                <li className="bg-green_2 p-3 rounded">
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
                  <Link to="/register">تسجيل الخروج</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
