import Line from "../../../../assets/svgs/underline.svg";
import AccessIcon from "../../../../assets/svgs/power.svg";
import AccessOneIcon from "../../../../assets/svgs/share.svg";
import LearnIcon from "../../../../assets/svgs/home.svg";
import LearnOneIcon from "../../../../assets/svgs/learn1.svg";

const Teach = () => {
  return (
    <div className="mt-32 min-h-screen gap-10 flex flex-col lg:flex-row justify-center items-center max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="flex-1 flex flex-col sm:flex-row gap-10">
        <div className="flex-1 grid gap-5">
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={AccessIcon} alt="access" />
            <div className="mt-12">
              Empower the new generation with what you have learned. And spread
              the word.
            </div>
          </div>
          <div className="p-5 bg-e-green rounded-xl">
            <img src={LearnIcon} alt="access" />
            <div className="mt-12">
              Teach the students from the comfort of the home. And bring ease
              for yourself and your students.
            </div>
          </div>
        </div>

        <div className="flex-1 grid gap-5 sm:translate-y-[50px]">
          <div className="p-5 bg-e-green rounded-xl">
            <img src={AccessOneIcon} alt="access" />
            <div className="mt-12">
              Grow your network. Provide value and be visible to your students.
            </div>
          </div>
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={LearnOneIcon} alt="access" />
            <div className="mt-12">
              Now teach more and earn more. A great way for you to increase your
              income.
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
            A tutor can use an eLearning platform to create and deliver online
            courses on a variety of topics.
          </li>
          <li>
            A tutor can use an eLearning platform to provide one-on-one tutoring
            to students in remote locations.
          </li>
          <li>
            A tutor can use an eLearning platform to supplement their in-person
            tutoring sessions with online resources and activities.
          </li>
          <li>
            A tutor can use an eLearning platform to track student progress and
            provide feedback to students and their parents.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Teach;
