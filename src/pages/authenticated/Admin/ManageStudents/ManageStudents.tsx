import { Button, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";

const dummyStudents = [
  {
    name: "Student One",
    email: "student@gmail.com",
    status: "active",
  },
  {
    name: "Test student",
    email: "student@gmail.com",
    status: "inactive",
  },
];

const ManageStudents = () => {
  const navigate = useNavigate();
  return (
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
            />
          </div>
        </div>
        <StudentsTable students={dummyStudents} />
      </div>
    </div>
  );
};

export default ManageStudents;
