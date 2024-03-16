import { TextInput } from "@mantine/core";
import IssuesTable from "./components/IssuesTable";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import useNotification from "../../../../hooks/useNotification";
import { getReport } from "../../../../services/admin/report";
import TableSkeleton from "../../../../components/TableSkeleton";
import { ReportState } from "../../../../types/admins/report";

const ManageIssues = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ReportState | null>(null);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");
  const { handleError } = useNotification();

  console.log(reports);

  useEffect(() => {
    handleGetReport();
  }, [skip, limit]);

  const handleGetReport = () => {
    setLoading(true);
    getReport(limit, skip, search)
      .then((res: any) => {
        setReports(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Manage Issues
      </div>
      <div className="px-4 lg:px-10 mt-5">
        <div className="flex w-full justify-end">
          <TextInput
            leftSection={<CiSearch />}
            size="md"
            placeholder="search.."
            value={search}
            onKeyUp={(e: any) => {
              if (e.code === "Enter") {
                if (search !== "") {
                  setSearch(search);
                  handleGetReport();
                }
              } else if (e.code === "Backspace") {
                handleGetReport();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {!loading && (
          <IssuesTable
            limit={limit}
            setSkip={setSkip}
            setLimit={setLimit}
            skip={skip}
            reports={reports}
            handleGetReport={handleGetReport}
          />
        )}

        {loading && <TableSkeleton />}
      </div>
    </div>
  );
};

export default ManageIssues;
