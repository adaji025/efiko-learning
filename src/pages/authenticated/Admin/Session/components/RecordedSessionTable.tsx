import { Menu, Pagination, Select, Table } from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSessionState } from "../../../../../types/admins/session";
import { convertTo12HourClock } from "../../../../../utils";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>
};

const RecordedSessionTable = ({
  sessions,
  limit,
  setSkip,
  skip,
  setLimit
}: SessionProps) => {
  const [totalPages, setTotalPages] = useState(1);

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
                  <Table.Td>{convertTo12HourClock(session.time)}</Table.Td>
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
      <div className="mt-10 flex justify-between">
        <Pagination
          total={totalPages}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
        <div className="flex items-center gap-2">
          <div>Per page</div>
          <Select
            className="w-[100px]"
            data={[
              { label: "5", value: "5" },
              { label: "10", value: "10" },
              { label: "15", value: "15" },
              { label: "25", value: "25" },
              { label: "50", value: "50" },
              { label: "75", value: "75" },
              { label: "100", value: "100" },
            ]}
            value={limit.toString()}
            // @ts-ignore
            onChange={setLimit}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default RecordedSessionTable;
