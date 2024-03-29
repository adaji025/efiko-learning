import {
  Badge,
  LoadingOverlay,
  Menu,
  Pagination,
  Select,
  Table,
} from "@mantine/core";
import moment from "moment";
import { SlOptionsVertical } from "react-icons/sl";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSessionState } from "../../../../../types/admins/session";
import { CopyButton } from "@mantine/core";
import { FaRegCopy } from "react-icons/fa6";
import ConfirmDeleteSession from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import { assignStudentToSession, deleteSession } from "../../../../../services/admin/session";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";
import { convertTo12HourClock } from "../../../../../utils";
import { downloadUrl } from "../../../../../services/admin/curriculum";
import AssignTutorModal from "./AssignTutorModal";
import { getAllTutors } from "../../../../../services/admin/tutors";
import { TutorTypes } from "../../../../../types/admins/tutor";
import { updateSession } from "../../../../../services/session";
import AssignStudentModal from "./AssignStudentModal";
import { StudentsTypes } from "../../../../../types/admins/student";
import { getAllStudents } from "../../../../../services/admin/students";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetSessions?: () => void;
};

const UpcomingSessionTable = ({
  sessions,
  handleGetSessions,
  setSkip,
  setLimit,
  skip,
  limit,
}: SessionProps) => {
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<TutorTypes[]>([]);
  const [students, setStudents] = useState<StudentsTypes[]>([]);
  const [tutorId, setTutorId] = useState<string | null>("");
  const [studentId, setStudentId] = useState<string | null>("");
  const [assignTutorModal, setAssignTutorModal] = useState(false);
  const [assignStudenModal, setAssignStudenModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  console.log(students);

  useEffect(() => {
    if (sessions) setTotalPages(Math.ceil(sessions?.total / limit));
  }, [sessions, limit]);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetTutors();
    handleGetStudent();
  }, []);

  const handleGetTutors = () => {
    getAllTutors()
      .then((res: any) => {
        setTutors(res.data.data);
      })
      .then((err) => {
        handleError(err);
      });
  };

  const handleGetStudent = () => {
    getAllStudents()
      .then((res: any) => {
        setStudents(res.data.data);
      })
      .then((err) => {
        handleError(err);
      });
  };

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

  const handleAssignTutors = (id: string) => {
    setLoading(true);

    const value = {
      tutorId: id,
    };

    sessionId &&
      updateSession(sessionId, value)
        .then(() => {
          toast.success("Tutor Assigned successfully");
          handleGetSessions && handleGetSessions();
        })
        .catch((err: any) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const handleAssignStudent = (id: string) => {
    setLoading(true);

    const value = {
      studentAssignedId: id,
    };

    sessionId &&
    assignStudentToSession(sessionId, value)
        .then(() => {
          toast.success("Student Assigned successfully");
          handleGetSessions && handleGetSessions();
        })
        .catch((err: any) => {
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
      <AssignTutorModal
        tutors={tutors}
        close={() => setAssignTutorModal(false)}
        opened={assignTutorModal}
        handleAssignTutors={handleAssignTutors}
        tutorId={tutorId}
        setTutorId={setTutorId}
      />
      <AssignStudentModal
        students={students}
        close={() => setAssignStudenModal(false)}
        opened={assignStudenModal}
        handleAssignStudent={handleAssignStudent}
        setStudentId={setStudentId}
        studentId={studentId}
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
              <Table.Th className="whitespace-nowrap"> Type</Table.Th>
              <Table.Th className="whitespace-nowrap">Link</Table.Th>
              <Table.Th className="whitespace-nowrap">Passcode</Table.Th>
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
                    <Badge>{session.free ? "Free" : "Paid"}</Badge>
                  </Table.Td>
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
                        {!session.tutorId && (
                          <Menu.Item
                            onClick={() => {
                              setAssignTutorModal(true);
                              setSessionId(session._id);
                            }}
                          >
                            Assign Tutor
                          </Menu.Item>
                        )}
                        <Menu.Item
                          onClick={() => {
                            setAssignStudenModal(true);
                            setSessionId(session._id);
                          }}
                        >
                          Assign Student
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
            placeholder={limit.toString()}
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
            defaultValue={limit.toString()}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UpcomingSessionTable;
