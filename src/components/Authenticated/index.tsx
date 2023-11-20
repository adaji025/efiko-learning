import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";

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
          <main className="w-full bg-white pt-5 lg:pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] px-4 lg:px-10 mb-10 mt-[80px] lg:mt-[unset]">
            {/* <Routes>
              </Routes> */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Authenticated;
