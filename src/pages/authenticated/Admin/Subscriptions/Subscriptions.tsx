import { Fragment } from "react";
import { Button, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSearch } from "react-icons/ci";
import SubscriptionTable from "./components/SubscriptionTable";
import AddSubscription from "./components/AddSubscription";

const dummyAdmins = [
  {
    name: "Annaul",
    amount: "1000",
    status: "active",
  },
  {
    name: "Weekly",
    amount: "1000",
    status: "inactive",
  },
];

const Subscriptions = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <AddSubscription opened={opened} close={close} callback={() => {}} />
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
              />
            </div>
          </div>
          <SubscriptionTable admins={dummyAdmins} />
        </div>
      </div>
    </Fragment>
  );
};

export default Subscriptions;
