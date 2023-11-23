import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { IoHomeOutline } from "react-icons/io5";
import { FiSettings, FiUser } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";

import LogoMark from "../../assets/svgs/logo.svg";
import { getUser } from "../../services/user";
import useNotification from "../../hooks/useNotification";
import { ProfileTypes } from "../../types/auth";
import { EarningsIcon, NotificationIcon, SessionIcon } from "./svg";
import { setUser } from "../../redux/features/userSlice";
import { useDisclosure } from "@mantine/hooks";
import ConfirmLogout from "./ConfirmLogout";

const Sidebar = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const  [profile, setProfile] = useState<ProfileTypes | null>(null)
  const [loading, setLoading] = useState(false);
  const [showChildren, setShowChildren] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const dispatch = useDispatch();

 

  const id = localStorage.getItem("userId") ?? "";

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    profile?.accountType === "student" && setRoutes(userRoutes);
    profile?.accountType === "tutor" && setRoutes(adminRoutes);
  }, [profile]);

  const handleGetUser = () => {
    setLoading(true);

    getUser(id)
      .then((res: any) => {
        dispatch(setUser(res.data.data));
        setProfile(res.data.data)
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const userRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Sessions",
      icon: <SessionIcon />,
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
      icon: <NotificationIcon />,
      route: "/notifications",
    },
    {
      title: "My Profiles",
      icon: <FiUser size={20} />,
      route: "/my-profile",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      route: "/settings",
      key: ["edit-profile", "payments"],
      children: [
        {
          title: "Profile",
          route: "/edit-profile",
        },
        {
          title: "Payments",
          route: "/payments",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
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
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Sessions",
      icon: <SessionIcon />,
      route: "/profile",
      key: ["schedule-sessions", "upcoming-sessions", "recorded-sessions"],
      children: [
        {
          title: "Schedule Sessions",
          route: "/schedule-sessions",
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
      title: "Earnings",
      icon: <EarningsIcon />,
      route: "/earnings",
    },
    {
      title: "Notifications",
      icon: <NotificationIcon />,
      route: "/notifications",
    },
    {
      title: "My Profiles",
      icon: <FiUser size={20} />,
      route: "/my-profile",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      route: "/settings",
      key: ["edit-profile", "payments"],
      children: [
        {
          title: "Profile",
          route: "/edit-profile",
        },
        {
          title: "Payments",
          route: "/payments",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
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

  return (
    <Fragment>
      <ConfirmLogout close={close} opened={opened} />
      <LoadingOverlay visible={loading} />
      <aside className="flex w-full h-full flex-col">
        <div className="w-full">
          <img src={LogoMark} alt="" className="h-[100px]" />

          <div className="grid gap-5 text-sm sm:text-base text-white">
            {routes.map((item: any) => (
              <Fragment key={item.title}>
                {item.children ? (
                  <>
                    <div
                      className={`flex gap-2 items-center transition-all duration-300 cursor-pointer ${
                        item.key.includes(location.pathname.split("/")[1]) &&
                        showChildren !== item.title
                          ? "bg-[#2F1792] rounded-md p-2 font-bold"
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
                            [
                              "pl-5 text-sm",
                              isActive
                                ? "bg-[#2F1792] rounded-md py-2 font-bold"
                                : null,
                            ]
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
                          ? "rounded-md font-bold bg-[#2F1792] p-2"
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

        <div
          className="flex gap-2 items-center pt-3 text-white cursor-pointer"
          onClick={open}
        >
          <BiLogOut
            size={18}
            color="white"
            className="rotate-180 cursor-pointer"
          />
          <div>Logout</div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
