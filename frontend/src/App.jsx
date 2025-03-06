import Login from "./pages/Login/login.jsx";
import Signup from "./pages/Signup/signup.jsx";
import Home from "./pages/Home/home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";

function App() {
  const { user } = useAuth(); // Accessing the user from the context

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to={'/login'}/>} />
      <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
      {/* If user is logged in, navigate to home */}
      <Route path="/signup" element={user ? <Navigate to='/' /> : <Signup />} />
    </Routes>
  );
}

export default App;
