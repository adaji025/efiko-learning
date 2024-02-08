import { Menu, Pagination, Table } from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSessionState } from "../../../../../types/admins/session";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

const RecordedSessionTable = ({
  sessions,
  limit,
  setSkip,
  skip,
}: SessionProps) => {
  const [totalPages, setTotalPages] = useState(1);

  console.log(sessions);

  useEffect(() => {
    if (sessions) setTotalPages(Math.ceil(sessions?.total / limit));
  }, [sessions, limit]);

  const navigate = useNavigate();
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
              <Table.Th>Link</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sessions &&
              sessions.data.map((session) => (
                <Table.Tr key={session._id}>
                  <Table.Td>{session.title}</Table.Td>
                  <Table.Td>{session.tutorId?.fullName}</Table.Td>
                  <Table.Td>
                    {moment(session?.date).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>{session.time}</Table.Td>
                  <Table.Td>3</Table.Td>
                  <Table.Td
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`${session._id}`, { state: session })
                    }
                  >
                    View record
                  </Table.Td>
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
                            navigate(`${session._id}`, { state: session })
                          }
                        >
                          View session
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
        {sessions && (sessions.data.length === 0 || !sessions) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
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

export default RecordedSessionTable;
