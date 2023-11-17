import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LearnMore from "../../pages/unauthenticated/LearnMore/LearnMore";
import Home from "../../pages/unauthenticated/Home/Home";
import ContactUs from "../../pages/unauthenticated/ContactUs/contactUs";
// import ContactUs from "../../pages/unauthenticated/LearnMore/LearnMore";

const Unauthenticated = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Unauthenticated;
