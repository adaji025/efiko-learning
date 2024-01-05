import { useEffect, useState, Fragment } from "react";
import { Button, TextInput, LoadingOverlay } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";
import { getStudents } from "../../../../services/admin/students";
import { StudentState } from "../../../../types/admins/student";



const ManageStudents = () => {
  const [students, setStudents] = useState<StudentState | null>(null);
  const [loading] = useState(false);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetStudents();
  }, [limit, skip, search]);

  const handleGetStudents = () => {
    getStudents(limit, skip, search).then((res: any) => {
      setStudents(res.data);
    });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <StudentsTable students={students} limit={limit} setSkip={setSkip} skip={skip} />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageStudents;
