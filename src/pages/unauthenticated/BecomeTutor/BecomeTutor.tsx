import FeaturedTutors from "../Home/component/FeaturedTutors";
import Teach from "../Home/component/Teach";
import Testimonial from "../Home/component/Testimonial";
import Banner from "./components/Banner";
import { Button } from "@mantine/core";

const BecomeTutor = () => {
  return (
    <div>
      <Banner />
      <div className="mt-20 max-w-[1000px] mx-auto px-6 lg:px-8 bg-secondary py-3 rounded">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <div className="font-bold text-2xl sm:text-4xl">50+</div>
            <div>Subjects</div>
          </div>
          <div>
            <div className="font-bold text-2xl sm:text-4xl">300+</div>
            <div>Tutors</div>
          </div>
          <div>
            <div className="font-bold text-2xl sm:text-4xl">2k+</div>
            <div>Students</div>
          </div>
        </div>
      </div>

      <FeaturedTutors />
      <div className="mt-10 flex justify-center">
        <Button className="bg-primary">Become a tutor</Button>
      </div>

      <Teach />

      <Testimonial />
    </div>
  );
};

export default BecomeTutor;
