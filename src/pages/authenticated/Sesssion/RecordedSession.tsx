import { useEffect, useState, Fragment } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/SessionCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import { SessionTypes } from "../../../types/session";
import useNotification from "../../../hooks/useNotification";
import { getSession } from "../../../services/session";

const RedcordedSession = () => {
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
          Recorded Sesion
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
                  btnText={
                    userData?.accountType === "student"
                      ? "Review Session"
                      : "View Recorded Session"
                  }
                  handleBtnClick={() => {
                    userData?.accountType === "student" &&
                      navigate("/recorded-sessions/63ednecdsth");
                    userData?.accountType === "tutor" &&
                      navigate("/recorded-sessions-details/63ednecdsth");
                  }}
                  key={index}
                  item={item}
                />
              ))}
            </div>
          )}

          {sessionData.length === 0 && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <div>No recorded session available.</div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default RedcordedSession;
