import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { FiSettings, FiUser } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";

import LogoMark from "../../assets/svgs/logo.svg";
import { EarningsIcon, NotificationIcon, SessionIcon } from "./svg";
import { useDisclosure } from "@mantine/hooks";
import ConfirmLogout from "./ConfirmLogout";
import { LoginResponseType } from "../../types/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaUsers } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { GiSecretBook } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

type IProps = {
  openMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ openMobileNav }: IProps) => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [showChildren, setShowChildren] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);

  const userData: LoginResponseType = useSelector(
    (state: RootState) => state.user.userData
  );
  const location = useLocation();

  useEffect(() => {
    userData?.accountType === "student" && setRoutes(userRoutes);
    userData?.accountType === "tutor" && setRoutes(tutorRoutes);
    userData?.accountType === "superAdmin" && setRoutes(superAdminRoutes);
    userData?.accountType === "normalAdmin" && setRoutes(normalAdminRoutes);
  }, []);

  const userRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Sessions",
      icon: <SessionIcon />,
      route: "/session",
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
      title: "Payments",
      icon: <MdOutlinePayment size={20} />,
      route: "/payments",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      route: "/settings",
      key: ["edit-profile"],
      children: [
        {
          title: "Profile",
          route: "/edit-profile",
        },
      ],
    },
    {
      title: "FAQs",
      icon: <FaQuestion />,
      route: "/faqs",
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
      route: "/support",
      key: ["Report Issues"],
      children: [
        {
          title: "Report Issues",
          route: "/report-issues",
        },
      ],
    },
  ];

  const tutorRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Sessions",
      icon: <SessionIcon />,
      route: "/session",
      key: ["upcoming-sessions", "recorded-sessions", "preview-sessions"],
      children: [
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
      key: ["edit-profile"],
      children: [
        {
          title: "Profile",
          route: "/edit-profile",
        },
      ],
    },
    {
      title: "FAQs",
      icon: <FaQuestion />,
      route: "/faqs",
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
      route: "/support",
      key: ["Report Issues"],
      children: [
        {
          title: "Report Issues",
          route: "/report-issues",
        },
      ],
    },
  ];

  const superAdminRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Manage Sessions",
      icon: <SessionIcon />,
      route: "/manage-sessions",
      key: [
        "schedule-sessions",
        "manage-upcoming-sessions",
        "manage-recorded-sessions",
        "preview-sessions",
        "manage-session-requests",
      ],
      children: [
        {
          title: "Schedule Sessions",
          route: "/schedule-sessions",
        },
        {
          title: "Upcoming Sessions",
          route: "manage-upcoming-sessions",
        },
        {
          title: "Recorded Sessions",
          route: "manage-recorded-sessions",
        },
        {
          title: "Session Requests",
          route: "manage-session-requests",
        },
      ],
    },
    {
      title: "Notifications",
      icon: <NotificationIcon />,
      route: "/admin-notifications",
    },
    {
      title: "Manage Admin",
      icon: <FaUsers />,
      route: "/manage-admins",
    },
    {
      title: "Manage Students",
      icon: <IoSchool />,
      route: "/manage-students",
    },
    {
      title: "Manage Tutors",
      icon: <FaUsers />,
      route: "/manage-tutors",
    },
    {
      title: "Curriculum",
      icon: <GiSecretBook />,
      route: "/curriculum",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      route: "/settings",
      key: ["subscriptions", "payments"],
      children: [
        {
          title: "Manage Payments",
          route: "/manage-payments",
        },
        {
          title: "Subscriptions",
          route: "/subscriptions",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
      route: "/manage-issues",
    },
  ];

  const normalAdminRoutes = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={20} />,
      route: "/dashboard",
    },
    {
      title: "Manage Sessions",
      icon: <SessionIcon />,
      route: "/manage-sessions",
      key: [
        "schedule-sessions",
        "manage-upcoming-sessions",
        "manage-recorded-sessions",
        "preview-sessions",
        "manage-session-requests",
      ],
      children: [
        {
          title: "Schedule Sessions",
          route: "/schedule-sessions",
        },
        {
          title: "Upcoming Sessions",
          route: "manage-upcoming-sessions",
        },
        {
          title: "Recorded Sessions",
          route: "manage-recorded-sessions",
        },
        {
          title: "Session Requests",
          route: "manage-session-requests",
        },
      ],
    },
    {
      title: "Notifications",
      icon: <NotificationIcon />,
      route: "/admin-notifications",
    },
    {
      title: "Manage Students",
      icon: <IoSchool />,
      route: "/manage-students",
    },
    {
      title: "Manage Tutors",
      icon: <FaUsers />,
      route: "/manage-tutors",
    },
    {
      title: "Curriculum",
      icon: <GiSecretBook />,
      route: "/curriculum",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      route: "/settings",
      key: ["subscriptions", "payments"],
      children: [
        {
          title: "Manage Payments",
          route: "/manage-payments",
        },
        {
          title: "Subscriptions",
          route: "/subscriptions",
        },
      ],
    },
    {
      title: "Help & Support",
      icon: <IoIosHelpCircleOutline size={20} />,
      route: "/manage-issues",
    },
  ];

  return (
    <Fragment>
      <ConfirmLogout close={close} opened={opened} />
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
                          onClick={() => openMobileNav(false)}
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
                    onClick={() => openMobileNav(false)}
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
