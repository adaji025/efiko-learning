import { Button, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import CurriculumsTable from "./components/CurriculumsTable";
import { Fragment, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import AddCurriculum from "./components/AddCurriculum";
import { getCurriculums } from "../../../../services/admin/curriculum";
import { CurriculumState } from "../../../../types/curriculum";
import useNotification from "../../../../hooks/useNotification";
import TableSkeleton from "../../../../components/TableSkeleton";

const Curriculum = () => {
  const [loading, setLoading] = useState(false);
  const [curriculum, setCurriculum] = useState<CurriculumState | null>(null);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(1);
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetCurriculum();
  }, [skip, limit]);

  const handleGetCurriculum = () => {
    setLoading(true);
    getCurriculums(limit, skip, search)
      .then((res: any) => {
        setCurriculum(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <AddCurriculum
        opened={opened}
        close={close}
        callback={handleGetCurriculum}
      />

      {/* <LoadingOverlay visible={loading} /> */}
      <div className="">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Curriculums
        </div>
        <div className="px-4 lg:px-10 mt-5">
          <div className="flex w-full flex-col sm:flex-row justify-between items-center">
            <div className="flex w-full justify-end sm:justify-start">
              <Button size="md" className="bg-primary" onClick={open}>
                Create Curriculum
              </Button>
            </div>
            <div className="flex w-full justify-start sm:justify-end">
              <TextInput
                leftSection={<CiSearch />}
                size="md"
                placeholder="Type and press enter.."
                value={search}
                onKeyUp={(e: any) => {
                  if (e.code === "Enter") {
                    if (search !== "") {
                      setSearch(search);
                      handleGetCurriculum();
                    }
                  }
                }}
                rightSection={
                  (search !== "" || search !== "") && (
                    <FaTimes
                      style={{ opacity: 0.5 }}
                      className="click cursor-pointer"
                      onClick={() => {
                        if (search !== "") {
                          setLoading(true);
                          setSearch("");
                        }
                        setSearch("");
                      }}
                    />
                  )
                }
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          {!loading && (
            <CurriculumsTable
              curriculums={curriculum}
              limit={limit}
              skip={skip}
              setSkip={setSkip}
              handleGetCurriculum={handleGetCurriculum}
              setLimit={setLimit}
            />
          )}

          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default Curriculum;
