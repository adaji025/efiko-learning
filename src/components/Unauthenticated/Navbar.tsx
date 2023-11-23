import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";
import LogoMark from "../../assets/svgs/logo.svg";
import styles from "./Navbar.module.css";

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
  const [toggle, setToggle] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();

  return (
    <div className="z-[999] w-full fixed top-0 bg-darkBlue bg-gray-50">
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
            <AiOutlineClose size={25} color="#157145" />
          ) : (
            <AiOutlineMenu size={25} color="#157145" />
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
                menu.title !== "Login" && navigate(menu.url);
                menu.title === "Login" && setToggle(!toggle);
                setMenu(false);
              }}
            >
              {menu.title}
              {menu.title === "Login" && <IoChevronDownOutline />}
              {toggle && menu.title === "Login" && (
                <div className="p-3 grid gap-2 text-start min-w-[150px] border absolute top-12 bg-white text-sm">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate("/student-login")}
                  >
                    Student Login
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Tutor Login
                  </div>
                </div>
              )}
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
