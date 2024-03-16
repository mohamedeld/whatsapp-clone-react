
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import Chat from "./pages/Chat";
import { useEffect, useState } from "react";
import SocketContext from "./context/SocketContext";
import AddQuestion from "./pages/AddQuestion";
import Question from "./pages/Question";
import Navbar from "./components/navbar/Navbar";
import NavbarMobile from "./components/navbar/NavbarMobile";
import OpenChatContext from "./context/OpenChatContext";
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.user);
  console.log(process.env.REACT_APP_API_ENDPOINT.split('/api/v1')[0])
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
        <Routes>
          <Route index path="/" element={token ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!token ? <Login />:<Navigate to="/"/>} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/login"/>} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login"/>} />
          <Route path="/questions" element={token ? <Question /> : <Navigate to="/login"/>} />
          <Route path="/add-question" element={token ? <AddQuestion /> : <Navigate to="/login"/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      </OpenChatContext>
       </SocketContext.Provider>
    </div>
  );
}

export default App;
