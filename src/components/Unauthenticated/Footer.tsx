import Logo from "../../assets/svgs/logo.svg";
import FB from "../../assets/svgs/fb.svg";
import IG from "../../assets/svgs/ig.svg";
import LinkedIN from "../../assets/svgs/linkedin.svg";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary px-6 lg:px-8 py-10 mt-32 text-white">
      <div className="max-w-[1400px] mx-auto grid gap-10 sm:grid-cols-4">
        <div className="sm:col-span-2 text-white">
          <div className="sm:max-w-[200px]">
            <img src={Logo} alt="" />
            <div className="mt-5 hidden sm:flex sm:justify-center gap-2">
              <div>Follow us:</div>
              <img src={FB} alt="facebook" />
              <img src={IG} alt="instagram" />
              <img src={LinkedIN} alt="linkedIn" />
            </div>
          </div>
        </div>
        <div className="text-white">
          <h2 className="font-bold">Quick Links</h2>
          <div className="grid gap-3 text-sm mt-5">
            <div className="cursor-pointer hover:underline">About Us</div>
            <div className="cursor-pointer hover:underline">FAQs</div>
            <div className="cursor-pointer hover:underline">Help & Support</div>
            <div className="cursor-pointer hover:underline">Upcoming Sessions</div>
            <div className="cursor-pointer hover:underline">Testimonials</div>
            <div className="cursor-pointer hover:underline">Privacy Policy</div>
            <div className="cursor-pointer hover:underline">Terms of Service</div>
          </div>
        </div>
        <div className="text-white">
          <h2 className="font-bold">Contact Us</h2>
          <div className="grid gap-3 text-sm mt-5">
            <div className="cursor-pointer">+00-123-456-789</div>
            <div className="cursor-pointer">help@abc.com</div>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
      <div className="mt-5 flex sm:hidden gap-2">
        <div>Follow us:</div>
        <img src={FB} alt="facebook" />
        <img src={IG} alt="instagram" />
        <img src={LinkedIN} alt="linkedIn" />
      </div>
      <div className="flex justify-center text-center mt-5">
        Copyrights {year} All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
