import { useEffect } from "react";
import AOS from "aos";
import Line from "../../../../assets/svgs/underline.svg";
import AccessIcon from "../../../../assets/svgs/access.svg";
import AccessOneIcon from "../../../../assets/svgs/access1.svg";
import LearnIcon from "../../../../assets/svgs/learn.svg";
import LearnOneIcon from "../../../../assets/svgs/learn1.svg";

const Learn = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="mt-32 min-h-screen gap-10 flex flex-col lg:flex-row justify-center items-center max-w-[1400px] mx-auto px-6 lg:px-8"
    >
      <div className="flex-1">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            Why you should learn at Efiko Learning ?
          </h2>
          <img src={Line} alt="line" />
        </div>
        <ul className="list-disc pl-5 grid gap-5">
          <li>
            Bringing kids of African descent in the diaspora closer to their
            culture of origin.
          </li>
          <li>
            Bridging the gaps between Western Education and the African cultural
            heritage.
          </li>
          <li>
            Embrace your inherent uniqueness as you learn traditional cultures,
            languages and religion.
          </li>
          <li>Learn and experience education from an African point-of-view.</li>
        </ul>
      </div>
      <div className="flex-1 flex gap-10">
        <div className="flex-1 grid gap-5">
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={AccessIcon} alt="access" />
            <div className="mt-12">
              Access to a wide range of interactive topics with increased
              flexibility and convenience
            </div>
          </div>
          <div className="p-5 bg-e-green rounded-xl">
            <img src={LearnIcon} alt="access" />
            <div className="mt-12">
              Learn from World-Class instructors with best-in-class industrial
              experience
            </div>
          </div>
        </div>

        <div className="flex-1 grid gap-5 translate-y-[50px]">
          <div className="p-5 bg-e-green rounded-xl">
            <img src={AccessOneIcon} alt="access" />
            <div className="mt-12">
              Excellence in class as you learn in a personalized setting
            </div>
          </div>
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={LearnOneIcon} alt="access" />
            <div className="mt-12">
              For the lowest of cost, enjoy the immediate and eventual benefits
              of your cultural uniqueness.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
