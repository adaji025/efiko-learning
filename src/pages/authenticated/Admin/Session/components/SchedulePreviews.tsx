import { BiArrowBack } from "react-icons/bi";
import { convertMinutesToHours } from "../../../../../utils";
import { CurriculumTypes } from "../../../../../types/curriculum";

type PreviewType = {
  previewData: {
    title: string;
    category: string;
    description: string;
    outcome: string;
    date: Date;
    time: string;
    duration: string;
    curriculumId: string;
  };
  free: boolean;
  curriculum: CurriculumTypes[];
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
};
const SchedulePreviews = ({
  previewData,
  setPreview,
  curriculum,
  free,
}: PreviewType) => {
  const singleCurriculum = curriculum.find(
    (curriculum) => curriculum._id
  )?.title;

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Book Sessions
      </div>
      <div
        className="flex gap-2 px-4 items-center mt-10 cursor-pointer"
        onClick={() => setPreview(false)}
      >
        <BiArrowBack /> Back
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold text-lg">
          {previewData.title}:{" "}
          <span className="font-normal pl-2 text-base">
            {" "}
            {previewData.description}{" "}
          </span>
        </div>
        <div className="px-4 lg:px-10 mt-3">
          <div>
            <div className="sm:text-lg font-medium">Subject Category: </div>
            <div className="text-sm ml-2">{previewData.category}</div>
          </div>
          <div className="mt-3">
            <div className="sm:text-lg font-medium">Subject Curriculum: </div>
            <div className="text-sm ml-2">{singleCurriculum}</div>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Description: </div>
            <div className="text-sm ml-2 max-w-[400px]">
              {previewData.description}
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Learning Outcome:</div>
            <ul className="ml-6 list-disc">
              <li>{previewData.outcome}</li>
              {/* <li>
                You will know what you can further expect from this domain.
              </li>
              <li>Enables you to appear in SAT.</li> */}
            </ul>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-5 justify-between">
            <div>
              <div className="sm:text-lg font-medium">Session Date: </div>
              <div className="text-sm ml-2">
                {previewData.date.toDateString()}
              </div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Time: </div>
              <div className="text-sm ml-2">{previewData.time}</div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Duration: </div>
              <div className="text-sm ml-2">
                {" "}
                {convertMinutesToHours(Number(previewData.duration))}
              </div>
            </div>
          </div>

          <div className="mt-5">{free ? "Free" : "Paid"} Session</div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePreviews;
