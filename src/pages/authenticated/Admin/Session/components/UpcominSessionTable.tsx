import { Menu, Pagination, Table } from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { SessionTypes } from "../../../../../types/session";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import Confirmation from "../../../../../components/Confirmation";

type SessionProps = {
  sessions: SessionTypes[] | null;
};

const UpcomingSessionTable = ({ sessions }: SessionProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <Fragment>
      <Confirmation
        btnText="delete session"
        close={close}
        handleClick={() => {}}
        opened={opened}
      />
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
                  <Table.Td
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/schedule-sessions/edit/${session._id}`, {
                        state: session,
                      })
                    }
                  >
                    {session.title}
                  </Table.Td>
                  <Table.Td>{session.tutorId?.fullName}</Table.Td>
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
                        <Menu.Item
                          onClick={() =>
                            navigate(`/schedule-sessions/edit/${session._id}`, {
                              state: session,
                            })
                          }
                        >
                          View session
                        </Menu.Item>
                        <Menu.Item
                          onClick={() =>
                            navigate(`/schedule-sessions/edit/${session._id}`, {
                              state: session,
                            })
                          }
                        >
                          Edit session
                        </Menu.Item>
                        <Menu.Item color="red" onClick={open}>
                          Delete session
                        </Menu.Item>
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

export default UpcomingSessionTable;
