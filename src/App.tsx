import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./components/Unauthenticated";
import Login from "./pages/unauthenticated/auth/Login";

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
        <Route path="/*" element={<Unauthenticated />} />
      </Routes>
    </MantineProvider>
  );
}
