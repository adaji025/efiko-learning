import { FaBars } from "react-icons/fa";
import { Avatar } from "@mantine/core";

type Props = {
  mobileNav: boolean;
  openMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ openMobileNav }: Props) => {
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
            <div className="font-semibold text-sm">John Doe</div>
            <div className="text-sm">Student</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
