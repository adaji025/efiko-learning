import { TextInput } from "@mantine/core";
import IssuesTable from "./components/IssuesTable";
import { CiSearch } from "react-icons/ci";
const dummyIssues = [
  {
    name: "test One",
    email: "tutor@gmail.com",
    title: "Payment issues",
    status: "pending",
  },
  {
    name: "student One",
    email: "tutor@gmail.com",
    title: "Payment issues",
    status: "resolved",
  },
];

const ManageIssues = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Manage Issues
      </div>
      <div className="px-4 lg:px-10 mt-5">
        <div className="flex w-full justify-end">
          <TextInput
            leftSection={<CiSearch />}
            size="md"
            placeholder="search.."
          />
        </div>
        <IssuesTable issues={dummyIssues} />
      </div>
    </div>
  );
};

export default ManageIssues;
