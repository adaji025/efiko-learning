import { useRef, useEffect } from "react";
import AOS from "aos";
import Quote from "../../../../assets/svgs/quote.svg";
import { Rating } from "@mantine/core";
import Slider from "react-slick";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { testimoinialData } from "../../../../components/data";

type IProps = {
  item: {
    name: string;
    text: string;
    role: string;
    image: string;
  };
};

const Card = ({ item }: IProps) => {
  return (
    <div className="p-5 bg-white mr-10">
      <div className="flex gap-2">
        <img src={Quote} alt="quote" />
        <Rating defaultValue={5} />
      </div>
      <div className="mt-3 text-justify">{item.text}</div>
      <div className="flex items-center gap-3 mt-3">
        <img src={item.image} alt="" className="h-[52px] w-[52px] rounded-md" />
        <div>
          <div className="font-semibold text-primary">{item.name}</div>
          <div>{item.role}</div>
        </div>
      </div>
    </div>
  );
};
const Testimonial = () => {
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
    slidesToShow: 3.5,
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
    <div
      data-aos="fade-up"
      className="mt-32 max-w-[1400px] mx-auto px-6 lg:px-8"
    >
      <div className="overflow-hidden py-10">
        <Slider {...settings} ref={sliderRef}>
          {testimoinialData.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </Slider>
      </div>
      <div className="flex justify-end gap-5">
        <div
          className="flex justify-center items-center h-[40px] w-[40px] rounded-full bg-secondary cursor-pointer"
          onClick={previous}
        >
          <FaArrowLeftLong />
        </div>
        <div
          className="flex justify-center items-center h-[40px] w-[40px] rounded-full bg-secondary cursor-pointer"
          onClick={next}
        >
          <FaArrowRightLong />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
