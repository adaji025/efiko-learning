import { Fragment, useEffect, useState } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import useNotification from "../../../../hooks/useNotification";
import { SessionTypes } from "../../../../types/session";
import { getUpcomingSession } from "../../../../services/session";
import UpcomingSessionTable from "./components/UpcominSessionTable";

const ManageUpcomingSession = () => {
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  console.log(sessions)

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
          <UpcomingSessionTable sessions={sessions} />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageUpcomingSession;
