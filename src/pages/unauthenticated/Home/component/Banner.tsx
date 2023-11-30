import { Fragment, useEffect } from "react";
import AOS from "aos";
import { CiPlay1 } from "react-icons/ci";
import Ellipse from "../../../../assets/svgs/ellipse.svg";
import Flash from "../../../../assets/svgs/flash.svg";
import Pen from "../../../../assets/svgs/pen.svg";
import { Button } from "@mantine/core";

const Banner = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Fragment>
      <div className="h-screen w-full bg-primary mt-[90px] relative text-white flex flex-col justify-center items-center px-6 lg:px-8">
        <img src={Ellipse} alt="" className="absolute bottom-28 right-0 w-20" />
        <div className="flex max-w-[1340px] mx-auto text-center">
          <img src={Flash} alt="" className="hidden lg:flex animate-pulse" />
          <div className="w-full">
            <div>
              <h1
                className="text-[24px] md:text-[36px] lg:text-[42px] font-bold"
                data-aos="zoom-in"
              >
                Empower yourself with the knowledge and learning styles that
                connects you to your African heritage.
              </h1>
              <div className="mt-3 max-w-[750px] mx-auto">
                Our learning platform stands out from the rest and is known
                for its cost-effectiveness. We take great pride in being
                recognized as the top choice in the industry.
              </div>
            </div>
          </div>
          <img
            src={Pen}
            alt=""
            className="hidden lg:flex transition-all duration-300 motion-safe:animate-pulse"
          />
        </div>
        <Button
          mt={24}
          size="md"
          leftSection={<CiPlay1 />}
          className="border border-white hover:scale-95 transition-all duration-300"
        >
          Watch Demo
        </Button>

        <div
          className="mt-20 max-w-[1000px] w-full mx-auto px-6 lg:px-8 bg-[#270C99] py-5 sm:py-3 rounded"
          data-aos="fade-up"
        >
          <div className="flex flex-col sm:flex-row gap-10 justify-center sm:justify-between items-center font-medium">
            <div className="text-center">
              <div className="font-bold text-2xl sm:text-4xl">10+</div>
              <div className="text-sm">Career molding topics</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl sm:text-4xl">200+</div>
              <div className="text-sm">World-class Instructors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl sm:text-4xl">2M+</div>
              <div className="text-sm">NextGen Leaders</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
