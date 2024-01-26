import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { SessionState} from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getUpcomingSession } from "../../../services/session";
import SessionCard from "../Dashboard/components/SessionCard";
import { BiArrowBack } from "react-icons/bi";
import EmptyIcon from "../../../assets/svgs/empty.svg";

const UpcomingSession = () => {
  const [sessions, setSessions] = useState<SessionState | null>(null);
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
          <div className="flex items-center gap-2">
            <BiArrowBack onClick={() => navigate(-1)} />
            <div> Upcoming Sessions</div>
          </div>
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
          {sessions?.data.length !== 0 && (
            <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
              {sessions?.data.map((item, index) => (
                <SessionCard
                  key={index}
                  item={item}
                  btnText="Join session"
                  handleBtnClick={() =>
                    navigate(`/upcoming-sessions/${item._id}`, { state: item })
                  }
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

export default UpcomingSession;
