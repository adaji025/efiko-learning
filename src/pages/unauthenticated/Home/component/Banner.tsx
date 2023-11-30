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
      <div className="h-screen w-full bg-primary mt-[60px] relative text-white flex flex-col justify-center items-center px-6 lg:px-8">
        <img src={Ellipse} alt="" className="absolute bottom-28 right-0 w-20" />
        <div className="flex max-w-[1340px] mx-auto text-center">
          <img src={Flash} alt="" className="hidden lg:flex animate-pulse" />
          <div className="w-full">
            <div>
              <h1
                className="text-[24px] md:text-[36px] lg:text-[42px] font-bold"
                data-aos="zoom-in"
              >
                Learn anything, anytime, anywhere.Empower yourself with
                knowledge.
              </h1>
              <div className="mt-3 max-w-[750px] mx-auto">
                Engage your learners with interactive content. Track their
                progress and provide feedback. Empower them to learn at their
                own pace.
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
          className="mt-20 max-w-[1000px] w-full mx-auto px-6 lg:px-8 bg-[#270C99] py-3 rounded"
          data-aos="fade-up"
        >
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
      </div>
    </Fragment>
  );
};

export default Banner;
