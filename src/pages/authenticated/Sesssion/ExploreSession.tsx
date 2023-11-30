import { useState, Fragment, useEffect } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/SessionCard";
import EmptyIcon from "../../../assets/svgs/empty.svg";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../../services/session";
import useNotification from "../../../hooks/useNotification";
import { SessionTypes } from "../../../types/session";

const ExploreSession = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const navigate = useNavigate();
  const { handleError } = useNotification();

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
          Explore Sesion
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
          {sessionData.length !== 0 && (
            <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
              {sessions &&
                sessions.map((session, index) => (
                  <SessionCard
                    btnText="Book session"
                    handleBtnClick={() => navigate("/explore-sessions/first")}
                    key={index}
                    item={session}
                  />
                ))}
            </div>
          )}

          {sessionData.length === 0 && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <img src={EmptyIcon} alt="" />
              <div>No such session found!</div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ExploreSession;
