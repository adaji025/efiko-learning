import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa6";
import { SessionTypes } from "../../../types/session";

const ViewRecordedSession = () => {
  const location = useLocation();
  const session: SessionTypes = location.state;

  const navigate = useNavigate();

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10 flex items-center gap-2">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        Recorded Sesion Details
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold">
          {session?.title}: Complete beginner guide.{" "}
        </div>
        <div className="px-4 lg:px-10 mt-3">
          <div>
            <div className="sm:text-lg font-medium">Subject Category: </div>
            <div className="text-sm ml-2">{session?.category}</div>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Description: </div>
            <div className="text-sm ml-2 max-w-[400px]">
              {session?.description}
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Learning Outcome:</div>
            <ul className="ml-6 list-disc">
              <li>{session.outcome}</li>
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
                {moment(session?.date).format("YYYY-MM-DD")}
              </div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Time: </div>
              <div className="text-sm ml-2">{session.time} WAT</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session duration:</div>
            <div className="text-sm ml-2">2 hours</div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button size="md" className=" bg-primary w-1/2 sm:w-1/3 mx-auto">
          <a href={session.recordingLink} target="_blank">
            View record
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ViewRecordedSession;
