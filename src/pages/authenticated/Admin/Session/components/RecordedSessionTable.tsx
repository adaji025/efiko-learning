import { Menu, Pagination, Table } from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { SessionTypes } from "../../../../../types/session";
import { Fragment } from "react";

type SessionProps = {
  sessions: SessionTypes[] | null;
};

const RecordedSessionTable = ({ sessions }: SessionProps) => {
  return (
    <Fragment>
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Tutor</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Students</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sessions &&
              sessions.map((session) => (
                <Table.Tr key={session._id}>
                  <Table.Td>{session.title}</Table.Td>
                  <Table.Td>{session.tutorId.fullName}</Table.Td>
                  <Table.Td>
                    {moment(session.date).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>{moment(session.date).format("HH : MM")}</Table.Td>
                  <Table.Td>3</Table.Td>
                  <Table.Td>
                    <Menu shadow="md" width={150}>
                      <Menu.Target>
                        <div className="pl-4">
                          <SlOptionsVertical
                            size={18}
                            className="cursor-pointer"
                          />
                        </div>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item>View</Menu.Item>
                        <Menu.Item>Delete</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
        {sessions && (sessions.length === 0 || !sessions) && (
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

export default RecordedSessionTable;
