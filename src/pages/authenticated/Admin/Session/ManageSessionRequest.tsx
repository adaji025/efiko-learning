import { TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import TableSkeleton from "../../../../components/TableSkeleton";
import SessionRequestTable from "./components/SessionRequestTable";
import { getSessionRequest } from "../../../../services/admin/session";
import { AdminSessionState } from "../../../../types/admins/session";
import useNotification from "../../../../hooks/useNotification";

const ManageSessionRequest = () => {
  const [sessions, setSessions] = useState<AdminSessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);

  const { handleError } = useNotification();


  useEffect(() => {
    handleGetSessionRequest();
  }, [limit, skip]);

  const handleGetSessionRequest = () => {
    setLoading(true);

    getSessionRequest(limit, skip, search)
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
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Session Request
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
                  handleGetSessionRequest();
                }
              } else if (e.code === "Backspace") {
                handleGetSessionRequest();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!loading && (
          <SessionRequestTable
            sessions={sessions}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
            handleGetSessionRequest={handleGetSessionRequest}
          />
        )}

        {loading && <TableSkeleton />}
      </div>
    </div>
  );
};

export default ManageSessionRequest;
