import { useEffect, useState, Fragment } from "react";
import { TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import useNotification from "../../../../hooks/useNotification";
import RecordedSessionTable from "./components/RecordedSessionTable";
import { getAdminUpcomingSession } from "../../../../services/admin/session";
import { AdminSessionState } from "../../../../types/admins/session";

const ManageRecordedSession = () => {
  const [sessions, setSessions] = useState<AdminSessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetSessions();
  }, [limit, skip, search]);

  const handleGetSessions = () => {
    setLoading(true);

    getAdminUpcomingSession(limit, skip, search)
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
          Recorded Sesions
        </div>
        <div className="px-4 lg:px-10">
          <div className="flex justify-end">
            <TextInput
              leftSection={<CiSearch />}
              size="md"
              mt={10}
              placeholder="search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <RecordedSessionTable
            sessions={sessions}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageRecordedSession;
