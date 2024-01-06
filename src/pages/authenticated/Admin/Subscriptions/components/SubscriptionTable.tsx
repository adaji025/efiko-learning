import { Pagination, Table } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import AddAdmin from "./AddSubscription";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { SubscriptionState } from "../../../../../types/admins/subscription";
import Subscriptions from "../Subscriptions";

type IProps = {
  subscriptions: SubscriptionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

const SubscriptionTable = ({ subscriptions, limit, setSkip, skip }: IProps) => {
  const [edit, setEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (subscriptions) setTotalPages(Math.ceil(subscriptions?.total / limit));
  }, [Subscriptions, limit]);
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
        btnText="Disable subscriptions"
      />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>status</Table.Th>

              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subscriptions?.data.map((admin, i) => (
              <Table.Tr key={i}>
                <Table.Td
                  className="cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  {admin.title}
                </Table.Td>
                <Table.Td>${admin.amount}</Table.Td>
                <Table.Td>
                  {/* {admin.status} */}
                  status
                </Table.Td>
                <Table.Td>
                  <div className="flex items-center gap-3">
                    <button
                      className={` w-full md:w-1/2 bg-primary text-white px-4 py-2 rounded-md text-xs sm:text-sm
                       ${
                         ``
                         // admin.status === "active" ? "bg-red-400" : "bg-primary"
                       }
                      `}
                      onClick={open}
                    >
                      {/* {admin.status === "active" ? "Disable" : "Activate"} */}
                      Deactivate
                    </button>
                    <CiEdit
                      size={24}
                      className="cursor-pointer"
                      onClick={() => setEdit(true)}
                    />
                    <IoEye
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

        {subscriptions &&
          (subscriptions.data.length === 0 || !subscriptions.data) && (
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

export default SubscriptionTable;
