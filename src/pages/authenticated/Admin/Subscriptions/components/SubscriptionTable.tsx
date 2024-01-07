import { LoadingOverlay, Pagination, Table } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import AddAdmin from "./AddSubscription";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import {
  SubscriptionState,
  SubscriptionTypes,
} from "../../../../../types/admins/subscription";
import Subscriptions from "../Subscriptions";
import { changeSubscriptionActiveState } from "../../../../../services/admin/subscription";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";

type IProps = {
  subscriptions: SubscriptionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetSubscriptions: () => void;
};

const SubscriptionTable = ({
  subscriptions,
  limit,
  setSkip,
  skip,
  handleGetSubscriptions,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionTypes | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();

  useEffect(() => {
    if (subscriptions)
      setTotalPages(Math.ceil(subscriptions?.total / subscriptions?.length));
  }, [Subscriptions, limit]);

  const handleChangeSubscriptionStatus = () => {
    setLoading(true);
    const value = {
      status: action,
    };
    subscription &&
      changeSubscriptionActiveState(subscription?._id, value)
        .then(() => {
          toast.success(
            `Subcription successfully ${
              action === "Activate" ? "deactivated" : "activated"
            }`
          );
          handleGetSubscriptions();
          close();
        })
        .catch((err: any) => {
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
        callback={handleGetSubscriptions}
        subscription={subscription}
      />
      <ConfirmDisable
        opened={opened}
        close={close}
        handleClick={handleChangeSubscriptionStatus}
        btnText={`${action} subscriptions`}
      />

      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>status</Table.Th>

              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subscriptions?.data.map((subscription, i) => (
              <Table.Tr key={i}>
                <Table.Td
                  className="cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  {subscription.title}
                </Table.Td>
                <Table.Td>{subscription.type}</Table.Td>
                <Table.Td>${subscription.amount}</Table.Td>
                <Table.Td>{subscription.status}</Table.Td>
                <Table.Td>
                  <div className="flex items-center gap-3">
                    <button
                      className={` w-full md:w-1/2 bg-primary text-white px-4 py-2 rounded-md text-xs sm:text-sm
                       ${
                         subscription.status === "Active"
                           ? "bg-red-400"
                           : "bg-primary"
                       }
                      `}
                      onClick={() => {
                        open();
                        setSubscription(subscription);
                        subscription.status === "Active"
                          ? setAction("Inactive")
                          : setAction("Active");
                      }}
                    >
                      {subscription.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                    <CiEdit
                      size={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        setSubscription(subscription);
                      }}
                    />
                    <IoEye
                      size={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        setSubscription(subscription);
                      }}
                    />
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {subscriptions &&
          (subscriptions.data.length === 0 || !subscriptions.data) && (
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

export default SubscriptionTable;
