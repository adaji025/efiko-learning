import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LearnMore from "../../pages/LearnMore/LearnMore";

const Unauthenticated = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Unauthenticated;
