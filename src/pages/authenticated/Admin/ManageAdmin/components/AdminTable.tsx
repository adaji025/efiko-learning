import { Pagination, Table } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import AddAdmin from "./AddAdmin";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { AdminTypes } from "../../../../../types/admins/admin";

type AdminProps = {
  admins: AdminTypes[] | undefined;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetAdmins: () => void;
};

const AdminTable = ({
  admins,
  limit,
  skip,
  setSkip,
  handleGetAdmins,
}: AdminProps) => {
  const [edit, setEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [admin, setAdmin] = useState<AdminTypes | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (admins) setTotalPages(Math.ceil(admins?.length / limit));
  }, [admins, limit]);
  return (
    <Fragment>
      <AddAdmin
        close={() => setEdit(false)}
        opened={edit}
        callback={handleGetAdmins}
        admin={admin}
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
            {admins &&
              admins.map((admin, i) => (
                <Table.Tr key={i}>
                  <Table.Td
                    className="cursor-pointer"
                    onClick={() => setEdit(true)}
                  >
                    {admin.fullName}
                  </Table.Td>
                  <Table.Td>{admin.email}</Table.Td>
                  <Table.Td>{admin.status}</Table.Td>
                  <Table.Td>
                    <div className="flex items-center gap-3">
                      <button
                        className={` w-full md:w-1/2 text-white px-4 py-2 rounded-md text-xs sm:text-sm ${
                          admin.status === "active"
                            ? "bg-red-400"
                            : "bg-primary"
                        }`}
                        onClick={open}
                      >
                        {admin.status === "active" ? "Disable" : "Activate"}
                      </button>
                      <CiEdit
                        size={24}
                        className="cursor-pointer"
                        onClick={() => {
                          setEdit(true);
                          setAdmin(admin);
                        }}
                      />
                      <IoEye
                        size={24}
                        className="cursor-pointer"
                        onClick={() => {
                          setEdit(true);
                          setAdmin(admin);
                        }}
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
        <Pagination
          total={totalPages}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
      </div>
    </Fragment>
  );
};

export default AdminTable;
