import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./components/Unauthenticated";
import Login from "./pages/unauthenticated/auth/Login";
import ForgotPassword from "./pages/unauthenticated/auth/ForgotPassword";
import ResetPassword from "./pages/unauthenticated/auth/ResetPassword";

export default function App() {
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
        <Route path="/*" element={<Unauthenticated />} />
      </Routes>
    </MantineProvider>
  );
}
