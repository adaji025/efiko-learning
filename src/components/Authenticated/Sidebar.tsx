import { Avatar, Text } from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { PiUserBold } from "react-icons/pi";
import LogoMark from "../../assets/svgs/logo.svg";
import { Fragment, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";

type Props = {
  openMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ openMobileNav }: Props) => {
  // const [routes, setRoutes] = useState<any[]>([]);
  const [showChildren, setShowChildren] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(users)

  const userRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline />,
      route: "/dashboard",
    },
    {
      title: "Sessions",
      icon: <FaRegUser />,
      route: "/profile",
      key: ["explore-sessions", "upcoming-sessions", "recorded-sessions"],
      children: [
        {
          title: "Explore Sessions",
          route: "/explore-sessions",
        },
        {
          title: "Upcoming Sessions",
          route: "upcoming-sessions",
        },
        {
          title: "Recorded Sessions",
          route: "recorded-sessions",
        },
      ],
    },
    {
      title: "Notifications",
      icon: <IoHomeOutline />,
      route: "/notifications",
    },
    {
      title: "My Profiles",
      icon: <IoHomeOutline />,
      route: "/my-profile",
    },
    {
      title: "Settings",
      icon: <IoHomeOutline />,
      route: "/settings",
      key: ["profile", "payments"],
      children: [
        {
          title: "Profile",
          route: "/profile",
        },
        {
          title: "Payments",
          route: "/payments",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <IoHomeOutline />,
      route: "/support",
      key: ["FAQs", "Report Issues"],
      children: [
        {
          title: "FAQs",
          route: "/faqs",
        },
        {
          title: "Report Issues",
          route: "/report-issues",
        },
      ],
    },
  ];

  const adminRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline />,
      route: "/dashboard",
    },
    {
      title: "User management",
      icon: <PiUserBold />,
      route: "/manage-user",
    },
    {
      title: "Profile Page",
      icon: <FaRegUser />,
      route: "/profile",
    },
    {
      title: "Manage Environments",
      icon: <IoHomeOutline />,
      route: "/manage-environment",
    },
  ];

  return (
    <Fragment>
      <aside className="flex w-full h-full flex-col">
        <div className="w-full">
          <img src={LogoMark} alt="" className="h-[100px]" />

          <div className="grid gap-5 text-sm sm:text-base text-white">
            {userRoutes.map((item: any) => (
              <Fragment key={item.title}>
                {item.children ? (
                  <>
                    <div
                      className={`flex gap-2 items-center transition-all duration-300 ${
                        item.key.includes(location.pathname.split("/")[1]) &&
                        showChildren !== item.title
                          ? "bg-white text-primary p-2 font-bold"
                          : ""
                      }`}
                      key={item.title}
                      onClick={() => {
                        if (showChildren === item.title) {
                          setShowChildren("");
                        } else {
                          setShowChildren(item.title);
                        }
                      }}
                    >
                      <span>{item.icon}</span>

                      <div>{item.title}</div>

                      <BiChevronDown
                        className={`arrow-down ${
                          showChildren === item.title
                            ? "rotate-180 transition-all duration-300"
                            : ""
                        }`}
                        size={18}
                      />
                    </div>

                    {showChildren === item.title &&
                      item.children.map((child: any) => (
                        <NavLink
                          key={child.title}
                          className={({ isActive }) =>
                            ["ml-5 text-sm", isActive ? "bg-white text-primary p-2 font-bold" : null]
                              .filter(Boolean)
                              .join(" ")
                          }
                          to={child.route}
                        >
                          <div>{child.title}</div>
                        </NavLink>
                      ))}
                  </>
                ) : (
                  <NavLink
                    key={item.title}
                    className={({ isActive }) =>
                      [
                        "flex gap-2 items-center",

                        isActive ||
                        (item.route === "/dashboard" &&
                          location.pathname === "/")
                          ? "text-primary font-bold bg-white p-2"
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    to={item.route}
                  >
                    <span>{item.icon}</span>

                    <div>{item.title}</div>
                  </NavLink>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center pt-3 text-white">
          <BiLogOut
            size={18}
            color="white"
            className="rotate-180 cursor-pointer"
            onClick={"logoutUser"}
          />
          <div>Logout</div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
