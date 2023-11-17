import Line from "../../../../assets/svgs/underline.svg";
import AccessIcon from "../../../../assets/svgs/access.svg";
import AccessOneIcon from "../../../../assets/svgs/access1.svg";
import LearnIcon from "../../../../assets/svgs/learn.svg";
import LearnOneIcon from "../../../../assets/svgs/learn1.svg";

const Learn = () => {
  return (
    <div className="mt-32 min-h-screen gap-10 flex flex-col lg:flex-row justify-center items-center max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="flex-1">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            Why you should learn at Efiko Learning ?
          </h2>
          <img src={Line} alt="line" />
        </div>
        <ul className="list-disc pl-5 grid gap-5">
          <li>
            A stay-at-home parent can take online courses to develop new skills
            and prepare for a career return.
          </li>
          <li>
            A working adult can take online courses to earn a degree or
            certification to advance their career.
          </li>
          <li>
            A person with a disability can take online courses to learn new
            skills and improve their quality of life.
          </li>
          <li>
            A senior citizen can take online courses to stay active and engaged
            in learning.
          </li>
        </ul>
      </div>
      <div className="flex-1 flex gap-10">
        <div className="flex-1 grid gap-5">
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={AccessIcon} alt="access" />
            <div className="mt-12">
              Access to wide range of courses with increased flexibility and
              convivence.
            </div>
          </div>
          <div className="p-5 bg-e-green rounded-xl">
            <img src={LearnIcon} alt="access" />
            <div className="mt-12">
              Access to wide range of courses with increased flexibility and
              convivence.
            </div>
          </div>
        </div>

        <div className="flex-1 grid gap-5 translate-y-[50px]">
          <div className="p-5 bg-e-green rounded-xl">
            <img src={AccessOneIcon} alt="access" />
            <div className="mt-12">
              Access to wide range of courses with increased flexibility and
              convivence.
            </div>
          </div>
          <div className="p-5 bg-e-yellow rounded-xl">
            <img src={LearnOneIcon} alt="access" />
            <div className="mt-12">
              Access to wide range of courses with increased flexibility and
              convivence.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
