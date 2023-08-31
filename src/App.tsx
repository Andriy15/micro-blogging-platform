import { Routes, Route } from "react-router-dom";
import { Login } from "./feature/auth/login/Login";
import { SignUp } from "./feature/auth/sign-up/SignUp";
import { Home } from "./pages/Home";
import { NotFound } from "./shared/error/404";
import { Loader } from "./shared/Loader";
import { NavLayout } from "./feature/layout/NavLayout";


function App() {
  return (
    <NavLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NavLayout>
  )
}

export default App
