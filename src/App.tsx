import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./components/Unauthenticated";
import Authenticated from "./components/Authenticated";
import Login from "./pages/unauthenticated/auth/Login";
import ForgotPassword from "./pages/unauthenticated/auth/ForgotPassword";
import ResetPassword from "./pages/unauthenticated/auth/ResetPassword";
import Register from "./pages/unauthenticated/auth/Register";
import TutorProfilSetup from "./pages/unauthenticated/auth/TutorProfilSetup";
import StudentProfilSetup from "./pages/unauthenticated/auth/StudentProfileSetup";
import {useState} from "react"

export default function App() {
  const [token] = useState(true)
  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
        fontFamily: "Poppins, sans-serif",
        defaultRadius: 8,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutor-profile-setup" element={<TutorProfilSetup/>} />
        <Route path="/student-profile-setup" element={<StudentProfilSetup />} />
        <Route path="/*" element={token ? <Authenticated /> :<Unauthenticated />} />
      </Routes>
    </MantineProvider>
  );
}
