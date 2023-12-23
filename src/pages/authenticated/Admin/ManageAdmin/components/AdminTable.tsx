import { Pagination, Table } from "@mantine/core";
import { Fragment, useState } from "react";
import { CiEdit } from "react-icons/ci";
import AddAdmin from "./AddAdmin";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";

type AdminProps = {
  admins: {
    name: string;
    email: string;
    status: string;
  }[];
};

const AdminTable = ({ admins }: AdminProps) => {
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <AddAdmin
        close={() => setEdit(false)}
        opened={edit}
        callback={() => {}}
      />
      <ConfirmDisable
        opened={opened}
        close={close}
        handleClick={() => {}}
        btnText="Disable user"
      />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>status</Table.Th>

              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {admins.map((admin, i) => (
              <Table.Tr key={i}>
                <Table.Td>{admin.name}</Table.Td>
                <Table.Td>{admin.email}</Table.Td>
                <Table.Td>{admin.status}</Table.Td>
                <Table.Td>
                  <div className="flex items-center gap-3">
                    <button
                      className={` w-full md:w-1/2 text-white px-4 py-2 rounded-md text-xs sm:text-sm ${
                        admin.status === "active" ? "bg-red-400" : "bg-primary"
                      }`}
                      onClick={open}
                    >
                      {admin.status === "active" ? "Disable" : "Activate"}
                    </button>
                    <CiEdit
                      size={24}
                      className="cursor-pointer"
                      onClick={() => setEdit(true)}
                    />
                  </div>
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {admins && (admins.length === 0 || !admins) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination total={10} className="text-primary" />
      </div>
    </Fragment>
  );
};

export default AdminTable;
