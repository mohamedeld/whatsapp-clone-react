
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import NavbarMobile from "./components/navbar/NavbarMobile";
import OpenChatContext from "./context/OpenChatContext";
import SocketContext from "./context/SocketContext";
import SupaLoading from "./components/SupaLoading";

const Home = lazy(()=> import("./pages/Home"));
const Question = lazy(()=> import("./pages/Question"));
const Login = lazy(()=> import("./pages/Login"));
const Register = lazy(()=> import("./pages/Register"));
const Chat = lazy(()=> import("./pages/Chat"));
const NotFound = lazy(()=> import("./pages/NotFound"));
const AddQuestion = lazy(()=> import("./pages/AddQuestion"));


function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.user);
  
  const {token} = user;
  const socket = io(process.env.REACT_APP_API_BASIC_ENDPOINT);
  let isAuthenticated = !!token;
  
  return (
    <div className="dark">
       <SocketContext.Provider value={socket}>
      <OpenChatContext>
      <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated}/>
      <NavbarMobile isAuthenticated={isAuthenticated} />
      <Suspense fallback={<SupaLoading/>}>
        <Routes>
          <Route index path="/" element={token ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!token ? <Login />:<Navigate to="/"/>} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/login"/>} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login"/>} />
          <Route path="/questions" element={token ? <Question /> : <Navigate to="/login"/>} />
          <Route path="/add-question" element={token ? <AddQuestion /> : <Navigate to="/login"/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      </OpenChatContext>
       </SocketContext.Provider>
    </div>
  );
}

export default App;
