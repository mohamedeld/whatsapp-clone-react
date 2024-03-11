
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> ({...state}));
  console.log(user);
  return (
    <div className="dark">
      
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
