import { LoadingOverlay, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import TutorTable from "./Components/TutorTable";
import { Fragment, useEffect, useState } from "react";
import { getTutors } from "../../../../services/admin/tutors";
import useNotification from "../../../../hooks/useNotification";
import { TutorState } from "../../../../types/admins/tutor";

const ManageTutors = () => {
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<TutorState | null>(null);
  const [limit] = useState(5);
  const [skip] = useState(0);
  const [search] = useState("");

  console.log(tutors)

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetTutors();
  }, []);

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
          <TutorTable tutors={tutors?.data} />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageTutors;
