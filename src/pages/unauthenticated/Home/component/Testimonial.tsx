import { useRef, useEffect } from "react";
import AOS from "aos";
import Quote from "../../../../assets/svgs/quote.svg";
import { Rating } from "@mantine/core";
import Slider from "react-slick";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import David from "../../../../assets/images/david-joe.png";

const Card = () => {
  return (
    <div className="p-5 bg-white mr-10">
      <div className="flex gap-2">
        <img src={Quote} alt="quote" />
        <Rating defaultValue={5} />
      </div>
      <div className="mt-3">
        I've been using the LMS platform for a few months now, and I'm really
        impressed with it. It's easy to use, both for me and for my learners. I
        love that I can create and deliver courses, track learner progress, and
        provide feedback all in one place.
      </div>
      <div className="flex items-center gap-2 mt-3">
        <img src={David} alt="" className="h-[52px] w-[52px] rounded-md" />
        <div className="font-semibold text-primary">Ammy John</div>
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
    <div data-aos="fade-up" className="mt-32 max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="overflow-hidden py-10">
        <Slider {...settings} ref={sliderRef}>
          {[...Array(7)].map((_, index) => (
            <Card key={index} />
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
