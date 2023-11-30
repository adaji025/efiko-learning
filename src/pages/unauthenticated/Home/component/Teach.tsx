import { useEffect } from "react";
import AOS from "aos";
import Line from "../../../../assets/svgs/underline.svg";
import AccessIcon from "../../../../assets/svgs/power.svg";
import AccessOneIcon from "../../../../assets/svgs/share.svg";
import LearnIcon from "../../../../assets/svgs/home.svg";
import LearnOneIcon from "../../../../assets/svgs/learn1.svg";

const Teach = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="mt-32 min-h-screen gap-10 flex flex-col lg:flex-row justify-center items-center max-w-[1400px] mx-auto px-6 lg:px-8"
    >
      <div className="flex-1 flex flex-col sm:flex-row gap-10">
        <div className="flex-1 grid gap-5">
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={AccessIcon} alt="access" />
            <div className="mt-12">
              Share your knowledge with the nextgen and help them thrive
            </div>
          </div>
          <div className="p-5 bg-e-green rounded-xl">
            <img src={LearnIcon} alt="access" />
            <div className="mt-12">
              Educate your students conveniently right from your home, ensuring
              comfort and convenience for both yourself and your esteemed
              students.
            </div>
          </div>
        </div>

        <div className="flex-1 grid gap-5 sm:translate-y-[50px]">
          <div className="p-5 bg-e-green rounded-xl">
            <img src={AccessOneIcon} alt="access" />
            <div className="mt-12">
              Utilize the knowledge you have acquired to empower others,
              guaranteeing that the message resonates across boundaries and
              beyond
            </div>
          </div>
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={LearnOneIcon} alt="access" />
            <div className="mt-12">
              Earn competitive compensation for teaching kids in the diaspora.
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-[50px] lg:mt-[unset]">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            Why you should teach at Efiko Learning ?
          </h2>
          <img src={Line} alt="line" />
        </div>
        <ul className="list-disc pl-5 grid gap-5">
          <li>
            Create and deliver classes on a variety of topics at your
            convenience.
          </li>
          <li>Increase your earning power teaching what you love.</li>
          <li>
            This opportunity is an excellent pathway for you to take your income
            to the next level.
          </li>
          <li>
            Expand your network by actively engaging with others. Offer valuable
            insights and make sure your presence is noticed by your students
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Teach;
