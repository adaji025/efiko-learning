import { Button, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import CurriculumsTable from "./components/CurriculumsTable";
import { Fragment } from "react";
import { useDisclosure } from "@mantine/hooks";
import AddCurriculum from "./components/AddCurriculum";

const dummyCurriculum = [
  {
    name: "intro to AI",
    date: "2024-10-14",
  },
  {
    name: "Ecology 101",
    date: "2024-10-14",
  },
];

const Curriculum = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Fragment>
      <AddCurriculum opened={opened} close={close} callback={() => {}} />
      <div className="mt-[50px] lg:mt-5">
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
                placeholder="search.."
              />
            </div>
          </div>
          <CurriculumsTable curriculums={dummyCurriculum} />
        </div>
      </div>
    </Fragment>
  );
};

export default Curriculum;
