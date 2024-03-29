import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import TutorTable from "./Components/TutorTable";
import { Fragment, useEffect, useState } from "react";
import { getTutors } from "../../../../services/admin/tutors";
import useNotification from "../../../../hooks/useNotification";
import { TutorState } from "../../../../types/admins/tutor";
import TableSkeleton from "../../../../components/TableSkeleton";

const ManageTutors = () => {
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<TutorState | null>(null);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");

  const { handleError } = useNotification();


  useEffect(() => {
    handleGetTutors();
  }, [limit, skip]);

  const handleGetTutors = () => {
    setLoading(true);
    getTutors(limit, skip, search)
      .then((res: any) => {
        setTutors(res.data);
      })
      .then((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <div className="">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Manage Tutors
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
                    handleGetTutors();
                  }
                } else if (e.code === "Backspace") {
                  handleGetTutors();
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {!loading && (
            <TutorTable
              tutors={tutors}
              limit={limit}
              setLimit={setLimit}
              setSkip={setSkip}
              skip={skip}
              handleGetTutors={handleGetTutors}
            />
          )}

          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageTutors;
