import { FaBars } from "react-icons/fa";
import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../types/auth";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { UserProfileTypes } from "../../types/user";
import { getUserProfile } from "../../services/user";

type Props = {
  mobileNav: boolean;
  openMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ openMobileNav }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  useEffect(() => {
    userData.accountType !== "superAdmin" &&
      userData.accountType !== "normalAdmin" &&
      handleGetUserProfile();
  }, []);

  const handleGetUserProfile = () => {
    getUserProfile(userData._id).then((res: any) => {
      setUserProfile(res.data);
    });
  };

  return (
    <div className="bg-white shadow fixed top-0 left-0 w-full z-50 lg:ml-[300px] lg:w-[calc(100vw-300px)] py-3">
      <div className="flex gap-4 items-center justify-between lg:justify-end px-4 lg:px-8">
        <div
          className="lg:hidden cursor-pointer flex justify-end items-center border-b"
          onClick={() => openMobileNav(true)}
        >
          <FaBars color="#157145" size={18} />
        </div>
        <div className="flex gap-2">
          <Avatar />
          <div>
            <div className="font-semibold text-sm capitalize">
              {userData.accountType === "student"
                ? `${userProfile?.data.firstName}  ${userProfile?.data.lastName}`
                : userData?.fullName}
            </div>
            <div className="text-sm capitalize">{userData?.accountType}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
