import { Pagination, Table } from "@mantine/core";
import { Fragment } from "react";

type IProps = {
  tutors: {
    name: string;
    email: string;
    status: string;
    suspend: boolean;
  }[];
};

const TutorTable = ({ tutors }: IProps) => {
  return (
    <Fragment>
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
            {tutors.map((tutor, i) => (
              <Table.Tr key={i}>
                <Table.Td>{tutor.name}</Table.Td>
                <Table.Td>{tutor.email}</Table.Td>
                <Table.Td>{tutor.status}</Table.Td>
                <Table.Td>
                  <div className="flex gap-3">
                    {tutor.status === "pending" && (
                      <Fragment>
                        <button
                          className={` text-white px-4 py-2 rounded-md bg-primary`}
                        >
                          Approve
                        </button>
                        <button
                          className={` text-white px-4 py-2 rounded-md bg-red-400`}
                        >
                          Reject
                        </button>
                      </Fragment>
                    )}

                    {tutor.status === "approved" && (
                      <button
                        className={` text-white px-4 py-2 rounded-md ${
                          tutor.suspend ? "bg-red-400" : "bg-primary"
                        }`}
                      >
                        {tutor.suspend ? "Disable" : "Activate"}
                      </button>
                    )}
                  </div>
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {tutors && (tutors.length === 0 || !tutors) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination total={10} className="text-primary" />
      </div>
    </Fragment>
  );
};

export default TutorTable;
