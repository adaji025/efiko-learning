import { LoadingOverlay, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import TutorTable from "./Components/TutorTable";
import { Fragment, useEffect, useState } from "react";
import { getTutors } from "../../../../services/admin/tutors";

const dummyTutors = [
  {
    name: "tutor One",
    email: "tutor@gmail.com",
    status: "pending",
    suspend: false,
  },
  {
    name: "Test tutor",
    email: "tutor@gmail.com",
    status: "approved",
    suspend: true,
  },
  {
    name: "Test tutor three",
    email: "tutor@gmail.com",
    status: "rejected",
    suspend: true,
  },
  {
    name: "Test tutor four",
    email: "tutor@gmail.com",
    status: "approved",
    suspend: false,
  },
];

const ManageTutors = () => {
  const [loading] = useState(false);
  const [limit] = useState(5);
  const [skip] = useState(0);
  const [search] = useState("");

  useEffect(() => {
    handleGetTutors();
  }, []);

  const handleGetTutors = () => {
    getTutors(limit, skip, search).then((res) => {
      console.log(res);
    });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Manage Tutors
        </div>
        <div className="px-4 lg:px-10 mt-5">
          <div className="flex w-full justify-end">
            <TextInput
              leftSection={<CiSearch />}
              size="md"
              placeholder="search.."
            />
          </div>
          <TutorTable tutors={dummyTutors} />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageTutors;
