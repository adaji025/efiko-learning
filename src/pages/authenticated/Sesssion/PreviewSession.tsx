import moment from "moment";
import { convertTo12HourClock, isToday } from "../../../utils";
import { useLocation } from "react-router-dom";
import { downloadUrl } from "../../../services/admin/curriculum";
import { AdminSessionType } from "../../../types/admins/session";
import { Button } from "@mantine/core";
import { GrCloudDownload } from "react-icons/gr";

const PreviewSession = () => {
  const location = useLocation();
  const session: AdminSessionType = location.state;

  console.log(session);
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Schedule Sessions
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold">
          {session?.title}
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
              <li>{session?.outcome}</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-5 justify-between">
            <div>
              <div className="sm:text-lg font-medium">Session Date: </div>
              <div className="text-sm ml-2">
                {moment(session?.date).format("DD-MM-YYYY")}
              </div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Time: </div>
              <div className="text-sm ml-2">
                {convertTo12HourClock(session?.time)}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Curriculum:</div>
            <div className="flex gap-3 items-center">
              <div className="capitalize">{session.curriculumId.title}</div>
              <Button
                className="text-sm ml-2 mt-5 bg-primary"
                leftSection={<GrCloudDownload />}
              >
                <a
                  href={downloadUrl(session.curriculumId.uniqueId)}
                  target="_blank"
                >
                  {session.curriculumId.title}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          className="text-[#F5F5F5] bg-primary font-bold border-t rounded-b-xl py-2 mt-2 mb-0 "
          disabled={!isToday(moment(session.date).format())}
          size="md"
        >
          <a
            target="_blank"
            href={session.meetingLink}
            className={`${!isToday(session.date) && "pointer-events-none"}`}
          >
            Start Session
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PreviewSession;
