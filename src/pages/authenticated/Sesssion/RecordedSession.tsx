import { useEffect, useState, Fragment } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import SessionCard from "../Dashboard/components/SessionCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import { SessionState } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";

import { BiArrowBack } from "react-icons/bi";
import EmptyIcon from "../../../assets/svgs/empty.svg";
import { getStudentRecordedSession } from "../../../services/session";

const RedcordedSession = () => {
  const [sessions, setSessions] = useState<SessionState | null>(null);
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

    getStudentRecordedSession()
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
            <div> Recorded Sessions</div>
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
          {sessions?.length !== 0 && (
            <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
              {sessions?.data.map((item, index) => (
                <SessionCard
                  btnText={
                    userData?.accountType === "student"
                      ? "Review Session"
                      : "View Recorded Session"
                  }
                  handleBtnClick={() => {
                    navigate(`/recorded-sessions/${item._id}`, { state: item });
                  }}
                  key={index}
                  item={item}
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

export default RedcordedSession;
