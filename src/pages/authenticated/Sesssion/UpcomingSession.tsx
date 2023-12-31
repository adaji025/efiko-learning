import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import { useNavigate } from "react-router-dom";
import { SessionTypes } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getUpcomingSession } from "../../../services/session";
import SessionCard from "../Dashboard/components/SessionCard";

const UpcomingSession = () => {
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleGetSessions = () => {
    setLoading(true);

    getUpcomingSession()
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
                <SessionCard
                  key={index}
                  item={item}
                  btnText="Join session"
                  handleBtnClick={() => navigate("/upcoming-sessions/first")}
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

export default UpcomingSession;
