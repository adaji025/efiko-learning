import { Fragment, useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import useNotification from "../../../../hooks/useNotification";
import UpcomingSessionTable from "./components/UpcominSessionTable";
import { getAdminUpcomingSession } from "../../../../services/admin/session";
import { AdminSessionState } from "../../../../types/admins/session";
import TableSkeleton from "../../../../components/TableSkeleton";

const ManageUpcomingSession = () => {
  const [sessions, setSessions] = useState<AdminSessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetSessions();
  }, [limit, skip]);

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
              value={search}
              onKeyUp={(e: any) => {
                if (e.code === "Enter") {
                  if (search !== "") {
                    setSearch(search);
                    handleGetSessions();
                  }
                } else if (e.code === "Backspace") {
                  handleGetSessions();
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {!loading && (
            <UpcomingSessionTable
              sessions={sessions}
              limit={limit}
              skip={skip}
              setSkip={setSkip}
              setLimit={setLimit}
              handleGetSessions={handleGetSessions}
            />
          )}

          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageUpcomingSession;
