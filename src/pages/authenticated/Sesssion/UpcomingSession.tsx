import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/SessionCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import UpcomingSessionCard from "./components/UpcomingSessionCard";
import { toast } from "react-toastify";
import { SessionTypes } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getSession } from "../../../services/session";

const UpcomingSession = () => {
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const { handleError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleGetSessions = () => {
    setLoading(true);

    getSession()
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
            <Fragment>
              {userData?.accountType === "student" && (
                <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
                  {sessions?.map((item, index) => (
                    <SessionCard
                      key={index}
                      item={item}
                      btnText="Join session"
                      handleBtnClick={() =>
                        navigate("/upcoming-sessions/first")
                      }
                    />
                  ))}
                </div>
              )}
              {userData?.accountType === "tutor" && (
                <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
                  {sessionData.map((item, index) => (
                    <UpcomingSessionCard
                      key={index}
                      item={item}
                      btnEditText="Edit"
                      btnStartText="Start"
                      handleEditClick={() =>
                        navigate("/schedule-sessions/first")
                      }
                      handleStartClick={() =>
                        toast.success("Session has started")
                      }
                    />
                  ))}
                </div>
              )}
            </Fragment>
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

export default UpcomingSession;
