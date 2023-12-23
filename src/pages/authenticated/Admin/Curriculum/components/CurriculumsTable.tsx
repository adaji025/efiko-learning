import { Fragment, useState } from "react";
import { Pagination, Table } from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { GrCloudDownload } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddCurriculum from "./AddCurriculum";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../../../../../components/Confirmation";

type IProps = {
  curriculums: {
    name: string;
    date: string;
  }[];
};

const CurriculumsTable = ({ curriculums }: IProps) => {
  const [edit, setEdit] = useState(false)
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <Fragment>
      <AddCurriculum opened={edit} close={() => setEdit(false)} callback={() => { }} />
      <ConfirmDelete opened={opened} close={close} handleClick={() => {}} btnText="Delete Curriculum" />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {curriculums.map((admin, i) => (
              <Table.Tr key={i}>
                <Table.Td>{admin.name}</Table.Td>
                <Table.Td>{admin.date}</Table.Td>
                <Table.Td>
                  <div className="flex gap-3">
                    <GrCloudDownload size={20} className="cursor-pointer" onClick={() => {}} />
                    <CiEdit size={20} className="cursor-pointer" onClick={() => setEdit(true)} />
                    <RiDeleteBin5Line size={20} className="cursor-pointer" onClick={open} />
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
        <Pagination total={4} className="text-primary" />
      </div>
    </Fragment>
  );
};

export default CurriculumsTable;
