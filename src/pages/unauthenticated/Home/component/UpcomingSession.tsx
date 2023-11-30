import { useRef, useEffect } from "react";
import AOS from "aos";
import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import Slider from "react-slick";
import SearchIcon from "../../../../assets/svgs/search.svg";
import { freeSessions } from "../../../../components/data";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type IProps = {
  item: {
    name: string;
    tutor: string;
    desc: string;
    duration: number;
  };
};

const Card = ({ item }: IProps) => {
  return (
    <div className="p-5 bg-white ml-10 shadow-lg md:min-h-[250px] rounded-md my-10">
      <div className="font-semibold">{item.name}</div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Avatar />
        <div>By: {item.tutor}</div>
      </div>
      <div className="mt-2">{item.desc}</div>
      <div className="flex gap-2 items-center justify-end">
        <IoMdTime /> {item.duration} mins
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      data-aos="fade-up"
      className="mt-32 max-w-[1400px] mx-auto px-6 lg:px-8"
    >
      <div className="flex gap-2 justify-center items-center">
        <h2 className="font-bold mb-3 text-primary text-2xl md:text-4xl">
          Upcoming Free Sessions
        </h2>
        <img src={SearchIcon} alt="" />
      </div>
      <div className="text-center text-lg">
        Learn from our 20 mins live sessions with our world-renowned experts.
      </div>
      <div className="flex items-center gap-5">
        <div
          className="flex justify-center items-center h-[30px] w-[30px] rounded-full bg-secondary cursor-pointer"
          onClick={previous}
        >
          <FaArrowLeftLong color="#1B086A" />
        </div>
        <div className="overflow-hidden w-[90%] mx-auto py-10">
          <Slider {...settings} ref={sliderRef}>
            {freeSessions.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </Slider>
        </div>
        <div
          className="flex justify-center items-center h-[30px] w-[30px] rounded-full bg-secondary cursor-pointer"
          onClick={next}
        >
          <FaArrowRightLong color="#1B086A" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingSession;
