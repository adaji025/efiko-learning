import { Fragment, useState } from "react";
import { Pagination, Table } from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { GrCloudDownload } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddCurriculum from "./AddCurriculum";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../../../../../components/Confirmation";
import {
  CurriculumState,
  CurriculumTypes,
} from "../../../../../types/curriculum";
import moment from "moment";

type IProps = {
  curriculums: CurriculumState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetCurriculum: () => void
};

const CurriculumsTable = ({ curriculums, skip, setSkip, handleGetCurriculum }: IProps) => {
  const [curriculum, setCurriculum] = useState<CurriculumTypes | null>(null);
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Fragment>
      <AddCurriculum
        opened={edit}
        close={() => setEdit(false)}
        callback={handleGetCurriculum}
        curriculum={curriculum || undefined}
      />
      <ConfirmDelete
        opened={opened}
        close={close}
        handleClick={() => {}}
        btnText="Delete Curriculum"
      />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {curriculums &&
              curriculums.data.map((curriculum: CurriculumTypes) => (
                <Table.Tr key={curriculum._id}>
                  <Table.Td>{curriculum.title}</Table.Td>
                  <Table.Td>
                    {moment(curriculum.createdAt).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>
                    <div className="flex gap-3">
                      <GrCloudDownload
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {}}
                      />
                      <CiEdit
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          setEdit(true);
                          setCurriculum(curriculum);
                        }}
                      />
                      <RiDeleteBin5Line
                        size={20}
                        className="cursor-pointer"
                        onClick={open}
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {curriculums && (curriculums.length === 0 || !curriculums) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination
          total={curriculums ? curriculums.length : 1}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
      </div>
    </Fragment>
  );
};

export default CurriculumsTable;
