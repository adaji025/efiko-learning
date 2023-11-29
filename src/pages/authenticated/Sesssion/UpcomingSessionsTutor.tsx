import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import { useNavigate } from "react-router-dom";
import { SessionTypes } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getTutorUpcomingSession } from "../../../services/session";
import UpcomingSessionCard from "./components/UpcomingSessionCard";
import { toast } from "react-toastify";

const UpcomingSessionTutor = () => {
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId") ?? "";

  const { handleError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleGetSessions = () => {
    setLoading(true);

    getTutorUpcomingSession(userId)
      .then((res: any) => {
        setSessions(res.data.data);
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Upcoming Sessions
        </div>
        <div className="px-4 lg:px-10">
          <div className="flex justify-end">
            <TextInput
              leftSection={<CiSearch />}
              size="md"
              mt={10}
              placeholder="search.."
            />
          </div>
          {sessions?.length !== 0 && (
            <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
              {sessions?.map((item, index) => (
                <UpcomingSessionCard
                  key={index}
                  item={item}
                  btnEditText="Edit"
                  btnStartText="Start"
                  handleEditClick={() => navigate("/schedule-sessions/first")}
                  handleStartClick={() => toast.success("Session has started")}
                />
              ))}
            </div>
          )}

          {sessionData.length === 0 && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <div>No upcoming session scheduled.</div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpcomingSessionTutor;
