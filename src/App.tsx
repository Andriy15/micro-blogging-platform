import { Routes, Route } from "react-router-dom";
import { Login } from "./feature/auth/login/Login";
import { SignUp } from "./feature/auth/sign-up/SignUp";
import { Home } from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default App;
