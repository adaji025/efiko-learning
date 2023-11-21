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
import VerifyUser from "./pages/unauthenticated/auth/Verify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const token = localStorage.getItem("efiko_token") ?? "";
  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
        fontFamily: "Poppins, sans-serif",
        defaultRadius: 8,
      }}
    >
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="/tutor-profile-setup" element={<TutorProfilSetup />} />
        <Route path="/student-profile-setup" element={<StudentProfilSetup />} />
        <Route
          path="/*"
          element={token ? <Authenticated /> : <Unauthenticated />}
        />
      </Routes>
    </MantineProvider>
  );
}
