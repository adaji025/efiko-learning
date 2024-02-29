import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { SessionTypes } from "../../../types/session";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";
import { isToday } from "../../../utils";
import { CopyButton } from "@mantine/core";
import { FaRegCopy } from "react-icons/fa6";

const ViewUpcomingSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session: SessionTypes = location.state;

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        <div className="flex items-center gap-2">
          <BiArrowBack onClick={() => navigate(-1)} />
          <div>Join Sessions</div>
        </div>
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold capitalize">
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

          <div className="mt-5 ml-2">
              <CopyButton value={session.passCode}>
                {({ copied, copy }) => (
                  <button
                    className="text-primary flex gap-2 items-center"
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                  >
                    {copied ? session.passCode : "Meeting Pass code"} <FaRegCopy />
                  </button>
                )}
              </CopyButton>
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
              <div className="text-sm ml-2">{session.time}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          disabled={!isToday(moment(session.date).format())}
          size="md"
          className=" bg-primary w-1/2 sm:w-1/3 mx-auto disabled:bg-primary/70"
        >
          <a
            target="_blank"
            href={session.meetingLink}
            className={`${
              !isToday(session.date) && "pointer-events-none"
            }`}
          >
            Join Session
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ViewUpcomingSession;
