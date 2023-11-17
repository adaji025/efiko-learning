import {
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineGlobal,
  AiOutlineTwitter,
} from "react-icons/ai";
import LogoMark from "../../../assets/svgs/logo.svg"
const Footer = () => {
  return (
    <footer className="bg-[#192331] p-[40px] text-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 gap-5 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div className="md:col-span-2">
          <img src={LogoMark} alt="" />
          <div className="max-w-[320px] mt-4 ">
            Design amazing digital experiences that create more happy in the
            world.
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Product</h2>
          <ul className="grid gap-3 mt-3">
            <li className="text-sm">Overview</li>
            <li className="text-sm">Features</li>
            <li className="text-sm">Solutions</li>
            <li className="text-sm">Tutorials</li>
            <li className="text-sm">Pricing</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Company</h2>
          <ul className="grid gap-3 mt-3">
            <li className="text-sm">About Us</li>
            <li className="text-sm">Careers</li>
            <li className="text-sm">Press</li>
            <li className="text-sm">News</li>
            <li className="text-sm">Media kits</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Resources</h2>
          <ul className="grid gap-3 mt-3">
            <li className="text-sm">Blog</li>
            <li className="text-sm">Newsletters</li>
            <li className="text-sm">Event</li>
            <li className="text-sm">Help center</li>
            <li className="text-sm">Tutorials</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Legal</h2>
          <ul className="grid gap-3 mt-3">
            <li className="text-sm">Terms</li>
            <li className="text-sm">Privacy</li>
            <li className="text-sm">Cookies</li>
            <li className="text-sm">License</li>
            <li className="text-sm">Settins</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 gap-5 flex flex-col sm:flex-row justify-between border-t pt-3 mt-6">
        <div>© 2077 CogniContract. All rights reserved.</div>
        <div className="flex gap-2">
          <AiOutlineTwitter size={24} color="#D0D5DD" />
          <AiFillLinkedin size={24} color="#D0D5DD" />
          <AiFillFacebook size={24} color="#D0D5DD" />
          <AiFillGithub size={24} color="#D0D5DD" />
          <AiOutlineGlobal size={24} color="#D0D5DD" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
