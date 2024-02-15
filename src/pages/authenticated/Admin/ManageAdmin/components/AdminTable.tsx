import { Pagination, Table, LoadingOverlay } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import AddAdmin from "./AddAdmin";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { AdminState, AdminTypes } from "../../../../../types/admins/admin";
import { updateAdmin } from "../../../../../services/admin";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";

type AdminProps = {
  admins: AdminState | null;
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
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [admin, setAdmin] = useState<AdminTypes | null>(null);
  const [status, setStatus] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (admins) setTotalPages(Math.ceil(admins?.total / limit));
  }, [admins, limit]);


  const { handleError } = useNotification();

  const handleUpdateAdmin = () => {
    setLoading(true);

    const values = {
      status,
    };
    admin &&
      updateAdmin(admin?._id, values)
      .then(() => {
        toast.success(`Admin ${status === "Activate" ? "Deactivated" : "Activated"} successfully`)
          close();
          handleGetAdmins();
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
      <AddAdmin
        close={() => setEdit(false)}
        opened={edit}
        callback={() => handleGetAdmins()}
        admin={admin}
      />
      <ConfirmDisable
        opened={opened}
        close={close}
        handleClick={() => handleUpdateAdmin()}
        btnText={status === "Inactive" ? "Deactivate user" : "Activate user"}
      />

      <LoadingOverlay visible={loading} />
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
              admins.data.map((admin, i) => (
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
                          admin.status === "Active"
                            ? "bg-red-400"
                            : "bg-primary"
                        }`}
                        onClick={() => {
                          open();
                          setAdmin(admin);
                          admin.status === "Active" && setStatus("Inactive");
                          admin.status === "inactive" && setStatus("Active");
                        }}
                      >
                        {admin.status === "Active" ? "Deactivate" : "Activate"}
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
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {admins && (admins.data.length === 0 || !admins) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No record available.</div>
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
