import Banner from "./component/Banner";
import Learn from "./component/Learn";
import Teach from "./component/Teach";
import UpcomingSession from "./component/UpcomingSession";
import FeaturedTutors from "./component/FeaturedTutors";
import Testimonial from "./component/Testimonial";
import { useEffect } from "react";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="bg-gray-50">
      <Banner />
      <Learn />
      <UpcomingSession />
      <Teach />
      <FeaturedTutors />
      <Testimonial />
    </div>
  );
};

export default Home;
