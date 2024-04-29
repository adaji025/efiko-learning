import { Pagination, Table, LoadingOverlay, Select, Menu } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import AddAdmin from "./AddAdmin";
import ConfirmDisable from "../../../../../components/Confirmation";
import ConfirmResetPassword from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { AdminState, AdminTypes } from "../../../../../types/admins/admin";
import { resetAdminPassword, updateAdmin } from "../../../../../services/admin";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";
import { SlOptionsVertical } from "react-icons/sl";

type AdminProps = {
  admins: AdminState | null;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  handleGetAdmins: () => void;
};

const AdminTable = ({
  admins,
  limit,
  skip,
  setSkip,
  setLimit,
  handleGetAdmins,
}: AdminProps) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [admin, setAdmin] = useState<AdminTypes | null>(null);
  const [status, setStatus] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [pwModal, openPwModal] = useState(false);

  useEffect(() => {
    if (admins) setTotalPages(Math.ceil(admins?.total / limit));
  }, [admins, limit]);

  console.log(admins)

  const { handleError } = useNotification();

  const handleUpdateAdmin = () => {
    setLoading(true);

    const values = {
      status,
    };
    admin &&
      updateAdmin(admin?._id, values)
        .then(() => {
          toast.success(
            `Admin ${
              status === "Activate" ? "Activated" : "Deactivated"
            } successfully`
          );
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

  const handleResetPassword = () => {
    setLoading(true);

    admin &&
      resetAdminPassword(admin?._id)
        .then(() => {
          toast.success(
            "Password reset successful, new password sent to admin's email"
          );
          openPwModal(false);
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
        handleGetAdmins={handleGetAdmins}
        admin={admin}
      />
      <ConfirmDisable
        opened={opened}
        close={close}
        handleClick={() => handleUpdateAdmin()}
        btnText={status === "Inactive" ? "Deactivate user" : "Activate user"}
      />
      <ConfirmResetPassword
        opened={pwModal}
        close={() => openPwModal(false)}
        handleClick={() => handleResetPassword()}
        btnText="Reset Password"
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
              admins.data.reverse().map((admin, i) => (
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
                          admin.status === "Inactive" && setStatus("Active");
                        }}
                      >
                        {admin.status === "Active" ? "Deactivate" : "Activate"}
                      </button>

                      <Menu shadow="md">
                        <Menu.Target>
                          <div className="pl-4">
                            <SlOptionsVertical
                              size={18}
                              className="cursor-pointer"
                            />
                          </div>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            onClick={() => {
                              setEdit(true);
                              setAdmin(admin);
                            }}
                          >
                            Edit Admin
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              setAdmin(admin);
                              openPwModal(true);
                            }}
                          >
                            Reset Password
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
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
      <div className="mt-10 flex justify-between">
        <Pagination
          total={totalPages}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
        <div className="flex items-center gap-2">
          <div>Per page</div>
          <Select
            className="w-[100px]"
            data={[
              { label: "5", value: "5" },
              { label: "10", value: "10" },
              { label: "15", value: "15" },
              { label: "25", value: "25" },
              { label: "50", value: "50" },
              { label: "75", value: "75" },
              { label: "100", value: "100" },
            ]}
            value={limit.toString()}
            // @ts-ignore
            onChange={setLimit}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminTable;
