import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LogoMark from "../../assets/svgs/logo.svg";
import styles from "./Navbar.module.css";
import LoginDropdown from "./LoginDropdown";
import ProgramsDropdown from "../ProgramsDropdown";

const navMenuItems = [
  {
    title: "Our Program",
    url: "/",
  },
  {
    title: "Login",
    url: "/login",
  },
  {
    title: "Become a Tutor",
    url: "/Become-a-tutor",
  },
  {
    title: "Contact Us",
    url: "/contact-us",
  },
  {
    title: "Learn More",
    url: "/learn-more",
  },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();

  return (
    <div className="z-[999] text-white w-full fixed top-0 bg-primary">
      <nav className={`px-5 lg:px-12 max-w-[1440px] ${styles.navbarItems}`}>
        <img
          src={LogoMark}
          alt="efiko learning"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div
          className={`cursor-pointer pr-2 ${styles.menuIcon}`}
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <AiOutlineClose size={25} color="white" />
          ) : (
            <AiOutlineMenu size={25} color="white" />
          )}
        </div>
        <div
          className={` ${
            menu ? styles.nav_menu + " " + styles.active : styles.nav_menu
          }`}
        >
          {navMenuItems.map((menu, idx) => (
            <div
              key={idx}
              className={`flex gap-2 items-center relative font-semibold border-b-4 border-transparent text-base md:text-lg cursor-pointer hover:border-pink hover:lg:text-primary-green-50 hover:lg:border-primary-green-50   transition- duration-200 ${
                router.pathname === menu.url
                  ? "lg:border-pink lg:text-primary-green-50"
                  : ""
              } `}
              onClick={() => {
                menu.title !== "Login" &&
                  menu.title !== "Our Program" &&
                  navigate(menu.url);
                menu.title !== "Login" &&
                  menu.title !== "Our Program" &&
                  setMenu(false);
              }}
            >
              {menu.title !== "Login" &&
                menu.title !== "Our Program" &&
                menu.title}

              {menu.title === "Login" && <LoginDropdown />}
              {menu.title === "Our Program" && <ProgramsDropdown />}
            </div>
          ))}
          <TextInput
            radius="md"
            leftSection={<CiSearch />}
            placeholder="What do you want to learn?"
            className="w-full hidden lg:block"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
