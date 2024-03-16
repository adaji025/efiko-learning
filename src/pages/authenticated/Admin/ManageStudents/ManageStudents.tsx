import { useEffect, useState, Fragment } from "react";
import { Button, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";
import { getStudents } from "../../../../services/admin/students";
import { StudentState } from "../../../../types/admins/student";
import useNotification from "../../../../hooks/useNotification";
import TableSkeleton from "../../../../components/TableSkeleton";

const ManageStudents = () => {
  const [students, setStudents] = useState<StudentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");

  const { handleError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetStudents();
  }, [limit, skip]);

  const handleGetStudents = () => {
    setLoading(true);
    getStudents(limit, skip, search)
      .then((res: any) => {
        setStudents(res.data);
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
          Manage Students
        </div>
        <div className="px-4 lg:px-10 mt-5">
          <div className="flex w-full flex-col sm:flex-row justify-between items-center">
            <div className="flex w-full justify-end sm:justify-start">
              <Button
                size="md"
                className="bg-primary"
                onClick={() => navigate("/manage-students/create-student")}
              >
                Create Student
              </Button>
            </div>
            <div className="flex w-full justify-start sm:justify-end">
              <TextInput
                leftSection={<CiSearch />}
                size="md"
                placeholder="search.."
                value={search}
                onKeyUp={(e: any) => {
                  if (e.code === "Enter") {
                    if (search !== "") {
                      setSearch(search);
                      handleGetStudents();
                    }
                  }else if (e.code === "Backspace") {
                    handleGetStudents();
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
         {!loading && <StudentsTable
            students={students}
            limit={limit}
            setLimit={setLimit}
            setSkip={setSkip}
            skip={skip}
            handleGetStudents={handleGetStudents}
          />}
          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageStudents;
