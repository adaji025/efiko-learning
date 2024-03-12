import { LoadingOverlay, Menu, Pagination, Table } from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSessionState } from "../../../../../types/admins/session";
import { CopyButton } from "@mantine/core";
import { FaRegCopy } from "react-icons/fa6";
import ConfirmDeleteSession from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { deleteSession } from "../../../../../services/admin/session";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";
import { convertTo12HourClock } from "../../../../../utils";
import { downloadUrl } from "../../../../../services/admin/curriculum";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetSessions?: () => void;
};

const UpcomingSessionTable = ({
  sessions,
  handleGetSessions,
  setSkip,
  skip,
  limit,
}: SessionProps) => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  console.log(sessions);

  useEffect(() => {
    if (sessions) setTotalPages(Math.ceil(sessions?.total / limit));
  }, [sessions, limit]);

  const { handleError } = useNotification();

  console.log(sessions);

  const handleDeleteSession = () => {
    setLoading(true);

    sessionId &&
      deleteSession(sessionId)
        .then(() => {
          toast.success("Session deleted successfully");
          handleGetSessions && handleGetSessions();
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <Fragment>
      <ConfirmDeleteSession
        opened={opened}
        close={close}
        btnText="Delete session"
        handleClick={handleDeleteSession}
      />
      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Tutor</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Curriculum</Table.Th>
              <Table.Th>Meeting Links</Table.Th>
              <Table.Th>Meeting Passcode</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sessions &&
              sessions?.data?.map((session) => (
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
                  <Table.Td>
                    {session?.tutorId
                      ? session?.tutorId?.fullName
                      : "Not assigned"}
                  </Table.Td>
                  <Table.Td>
                    {moment(session.date).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>{convertTo12HourClock(session.time)}</Table.Td>
                  <Table.Td>{session.curriculumId.title}</Table.Td>
                  <Table.Td>
                    <CopyButton value={session.meetingLink}>
                      {({ copied, copy }) => (
                        <button
                          className="text-primary flex gap-2 items-center"
                          color={copied ? "teal" : "blue"}
                          onClick={copy}
                        >
                          {copied ? "Copied" : "Meeting link"} <FaRegCopy />
                        </button>
                      )}
                    </CopyButton>
                  </Table.Td>
                  <Table.Td>
                    <CopyButton value={session.passCode}>
                      {({ copied, copy }) => (
                        <button
                          className="text-primary flex gap-2 items-center"
                          color={copied ? "teal" : "blue"}
                          onClick={copy}
                        >
                          {copied ? "Copied" : session.passCode} <FaRegCopy />
                        </button>
                      )}
                    </CopyButton>
                  </Table.Td>
                  <Table.Td>
                    <Menu shadow="md">
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
                            navigate(
                              `/manage-upcoming-sessions/${session._id}`,
                              {
                                state: session,
                              }
                            )
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
                        <Menu.Item
                          color="red"
                          onClick={() => {
                            setSessionId(session._id);
                            open();
                          }}
                        >
                          Delete session
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href={downloadUrl(session.curriculumId.uniqueId)}
                            target="_blank"
                          >
                            Download Curriculum
                          </a>
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

export default UpcomingSessionTable;
