import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import AdminTable from "./components/AdminTable";
import { Fragment, useEffect, useState } from "react";
import AddAdmin from "./components/AddAdmin";
import { useDisclosure } from "@mantine/hooks";
import { getAdmins } from "../../../../services/admin";

const dummyAdmins = [
  {
    name: "admin Admin",
    email: "admin@gmail.com",
    status: "active",
  },
  {
    name: "Test Admin",
    email: "admin@gmail.com",
    status: "inactive",
  },
];

const ManageAdmin = () => {
  const [loading] = useState(false);
  const [limit] = useState(5);
  const [skip] = useState(0);
  const [search] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    handleGetAdmins();
  }, []);

  const handleGetAdmins = () => {
    getAdmins(limit, skip, search).then((res) => {
      console.log(res);
    });
  };
  return (
    <Fragment>
      <AddAdmin opened={opened} close={close} callback={() => {}} />
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Manage Admins
        </div>
        <div className="px-4 lg:px-10 mt-5">
          <div className="flex w-full flex-col sm:flex-row justify-between items-center">
            <div className="flex w-full justify-end sm:justify-start">
              <Button size="md" className="bg-primary" onClick={open}>
                Create Admin
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
          <AdminTable admins={dummyAdmins} />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageAdmin;
