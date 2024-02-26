import { useState, Fragment, useEffect } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import SessionCard from "../Dashboard/components/SessionCard";
import EmptyIcon from "../../../assets/svgs/empty.svg";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../../services/session";
import useNotification from "../../../hooks/useNotification";
import { SessionState } from "../../../types/session";

const ExploreSession = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionState | null>(null);
  const navigate = useNavigate();
  const { handleError } = useNotification();

  useEffect(() => {
    handleGetSessions();
  }, []);

  console.log(sessions);

  const handleGetSessions = () => {
    setLoading(true);

    getSession()
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
          Explore Session
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
          {sessions && (
            <div className="gap-10 mt-5 grid sm:grid-cols-2 xl:grid-cols-3">
              {sessions &&
                sessions.data.map((session) => (
                  <SessionCard
                    btnText="Book session"
                    handleBtnClick={() =>
                      navigate(`/explore-sessions/${session._id}`, {
                        state: session,
                      })
                    }
                    key={session._id}
                    item={session}
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

export default ExploreSession;
