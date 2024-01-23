import { Fragment, useEffect, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSearch } from "react-icons/ci";
import SubscriptionTable from "./components/SubscriptionTable";
import AddSubscription from "./components/AddSubscription";
import { getSbubscritions } from "../../../../services/admin/subscription";
import useNotification from "../../../../hooks/useNotification";
import { SubscriptionState } from "../../../../types/admins/subscription";
import TableSkeleton from "../../../../components/TableSkeleton";

const Subscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionState | null>(
    null
  );
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetSubscriptions();
  }, [limit, skip]);

  const handleGetSubscriptions = () => {
    setLoading(true);
    getSbubscritions(limit, skip, search)
      .then((res: any) => {
        setSubscriptions(res.data);
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
      <AddSubscription
        opened={opened}
        close={close}
        callback={handleGetSubscriptions}
      />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Manage Subcriptions
        </div>
        <div className="px-4 lg:px-10 mt-5">
          <div className="flex w-full flex-col sm:flex-row justify-between items-center">
            <div className="flex w-full justify-end sm:justify-start">
              <Button size="md" className="bg-primary" onClick={open}>
                Create Subcription
              </Button>
            </div>
            <div className="flex w-full justify-start sm:justify-end">
              <TextInput
                leftSection={<CiSearch />}
                size="md"
                placeholder="search.."
                value={search}
                onKeyUp={(e: any) => {
                  if (e.code === "Enter") {
                    if (search !== "") {
                      setSearch(search);
                      handleGetSubscriptions();
                    }
                  } else if (e.code === "Backspace") {
                    handleGetSubscriptions();
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {!loading && (
            <SubscriptionTable
              subscriptions={subscriptions}
              limit={limit}
              setSkip={setSkip}
              skip={skip}
              handleGetSubscriptions={handleGetSubscriptions}
            />
          )}
          {loading && <TableSkeleton />}
        </div>
      </div>
    </Fragment>
  );
};

export default Subscriptions;
