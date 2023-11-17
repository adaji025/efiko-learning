import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LearnMore from "../../pages/unauthenticated/LearnMore/LearnMore";
import Home from "../../pages/unauthenticated/Home/Home";
import ContactUs from "../../pages/unauthenticated/ContactUs/contactUs";
import BecomeTutor from "../../pages/unauthenticated/BecomeTutor/BecomeTutor";

const Unauthenticated = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/become-a-tutor" element={<BecomeTutor />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Unauthenticated;
