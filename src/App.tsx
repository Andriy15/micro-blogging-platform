import { Routes, Route } from "react-router-dom";
import { Login } from "./feature/auth/login/Login";
import { SignUp } from "./feature/auth/sign-up/SignUp";
import { Home } from "./pages/Home";
import { NotFound } from "./shared/error/404";
import { NavLayout } from "./feature/layout/NavLayout";
import { EmailConfirm } from './feature/auth/sign-up/EmailConfirm'


function App() {
  return (
    <NavLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/confirm" element={<EmailConfirm />} />
      </Routes>
    </NavLayout>
  )
}

export default App
