import { useRef, useEffect } from "react";
import AOS from "aos";
import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import Slider from "react-slick";
import { sessionData } from "../../../../components/data";

type IProps = {
  item: {
    name: string;
    tutor: string;
    desc: string;
    duration: number;
  };
};

const Card = ({}: IProps) => {
  return (
    <div className="p-5 bg-white ml-10 shadow-lg rounded-md my-10">
      <div className="font-semibold">Algebra 101: Complete beginner guide.</div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Avatar />
        <div>by: Adaji Mukhtar</div>
      </div>
      <div className="mt-2">
        Algebra, the language of mathematics,To solve problems and explore new
        paths.
      </div>
      <div>
        <IoMdTime />
      </div>
    </div>
  );
};

const UpcomingSession = () => {
  const sliderRef = useRef(null);
  useEffect(() => {
    AOS.init();
  }, []);

  const next = () => {
    if (sliderRef.current) {
      // @ts-ignore
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      // @ts-ignore
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div data-aos="fade-up" className="mt-32 max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="flex items-center gap-5">
        <IoArrowBackCircle size={30} onClick={previous} />
        <div className="overflow-hidden w-[90%] mx-auto py-10">
          <Slider {...settings} ref={sliderRef}>
            {sessionData.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </Slider>
        </div>
        <IoArrowForwardCircle size={30} onClick={next} />
      </div>
    </div>
  );
};

export default UpcomingSession;
