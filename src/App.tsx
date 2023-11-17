import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

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
        <Route path="/" element={<Home />} />
      </Routes>
    </MantineProvider>
  );
}
