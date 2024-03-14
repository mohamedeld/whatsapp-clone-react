
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import Chat from "./pages/Chat";
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.user);
  const {token} = user;
  return (
    <div className="dark">
      
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={token ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!token ? <Login />:<Navigate to="/"/>} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/login"/>} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login"/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
