import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import AdminTable from "./components/AdminTable";
import { Fragment, useEffect, useState } from "react";
import AddAdmin from "./components/AddAdmin";
import { useDisclosure } from "@mantine/hooks";
import { getAdmins } from "../../../../services/admin";
import { AdminState } from "../../../../types/admins/admin";
import useNotification from "../../../../hooks/useNotification";

const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminState | null>(null);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetAdmins();
  }, [skip, limit, search]);

  const handleGetAdmins = () => {
    setLoading(true);
    getAdmins(limit, skip, search)
      .then((res: any) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        handleError(err);
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <AdminTable
            admins={admins?.data}
            limit={limit}
            setSkip={setSkip}
            skip={skip}
            handleGetAdmins={handleGetAdmins}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ManageAdmin;
