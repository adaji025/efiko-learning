import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/authenticated/Dashboard/Dashboard";
import ExploreSession from "../../pages/authenticated/Sesssion/ExploreSession";

const Authenticated = () => {
  const [mobileNav, openMobileNav] = useState(false);

  return (
    <>
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-primary p-[22px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Header mobileNav={mobileNav} openMobileNav={openMobileNav} />
          <main className="w-full bg-white pt-5 lg:pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] mb-10">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore-sessions" element={<ExploreSession />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Authenticated;
