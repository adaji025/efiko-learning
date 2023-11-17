import Tutor from "../../../../assets/images/tutor.png";

const Banner = () => {
  return (
    <div className="md:mt-10 min-h-screen gap-10 flex flex-col md:flex-row justify-center md:justify-start items-center max-w-[1400px] mx-auto px-6 lg:px-8 bg-gray-50">
      <div className="flex-1 flex flex-col justify-end lg:justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-primary">
          Now you can teach Anytime, anywhere
        </h2>
        <div className="mt-5">
          Engage your learners with interactive content. Track their progress
          and provide feedback. Empower them to learn at their own pace.
        </div>
      </div>
      <div className="flex-1">
        <img src={Tutor} alt="" />
      </div>
    </div>
  );
};

export default Banner;
