import { TextInput } from "@mantine/core";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TableSkeleton from "../../../../components/TableSkeleton";
import SessionRequestTable from "./components/SessionRequestTable";

const ManageSessionRequest = () => {
  const [loading] = useState(false);
  const [search, setSearch] = useState("");

  const handleGetSessionRequest = () => {};
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
       Sesion Request
      </div>

      <div className="px-4 lg:px-10">
        <div className="flex justify-end">
          <TextInput
            leftSection={<CiSearch />}
            size="md"
            mt={10}
            placeholder="search.."
            value={search}
            onKeyUp={(e: any) => {
              if (e.code === "Enter") {
                if (search !== "") {
                  setSearch(search);
                  handleGetSessionRequest();
                }
              } else if (e.code === "Backspace") {
                handleGetSessionRequest();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!loading && <SessionRequestTable />}

        {loading && <TableSkeleton />}
      </div>
    </div>
  );
};

export default ManageSessionRequest;
