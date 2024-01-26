import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { SessionState } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getTutorUpcomingSession } from "../../../services/session";
import UpcomingSessionCard from "./components/UpcomingSessionCard";
import { toast } from "react-toastify";
import EmptyIcon from "../../../assets/svgs/empty.svg";

const UpcomingSessionTutor = () => {
  const [sessions, setSessions] = useState<SessionState | null>(null);
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
        setSessions(res.data);
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
              {sessions?.data.map((item) => (
                <UpcomingSessionCard
                  key={item._id}
                  item={item}
                  btnEditText="Edit"
                  btnStartText="Start"
                  handleEditClick={() =>
                    navigate(`/schedule-sessions/edit/${item._id}`, {
                      state: item,
                    })
                  }
                  handleStartClick={() => toast.success("Session has started")}
                />
              ))}
            </div>
          )}
          
          {sessions && (sessions.data.length === 0 || !sessions) && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <img src={EmptyIcon} alt="" />
              <div>No session found!</div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpcomingSessionTutor;
