import {
  Badge,
  LoadingOverlay,
  Menu,
  Pagination,
  Select,
  Table,
} from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ConfirmApproval from "../../../../../components/Confirmation";
import ConfirmDisapproval from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import AssignTutorModal from "./AssignTutorModal";
import { getAllTutors } from "../../../../../services/admin/tutors";
import useNotification from "../../../../../hooks/useNotification";
import { TutorTypes } from "../../../../../types/admins/tutor";
import { AdminSessionState } from "../../../../../types/admins/session";
import moment from "moment";
import { updateSession } from "../../../../../services/session";
import { toast } from "react-toastify";
import { convertTo12HourClock } from "../../../../../utils";
import { downloadUrl } from "../../../../../services/admin/curriculum";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetSessionRequest: () => void;
};

const SessionRequestTable = ({
  limit,
  sessions,
  setSkip,
  skip,
  setLimit,
  handleGetSessionRequest,
}: SessionProps) => {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [approvalModal, setApprovalModal] = useState(false);
  const [disApprovalModal, setDisapprovalModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [tutors, setTutors] = useState<TutorTypes[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [tutorId, setTutorId] = useState<string | null>("");

  const { handleError } = useNotification();
  console.log(sessions);

  useEffect(() => {
    if (sessions) setTotalPages(Math.ceil(sessions?.total / limit));
  }, [sessions, limit]);

  useEffect(() => {
    handleGetTutors();
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

  const handleApproveSessionRequest = () => {
    setLoading(true);

    const value = {
      status: "approved",
    };

    sessionId &&
      updateSession(sessionId, value)
        .then(() => {
          toast.success("Session Approved successfully");
          handleGetSessionRequest();
        })
        .catch((err: any) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const handleDisApproveSessionRequest = () => {
    setLoading(true);

    const value = {
      status: "disapproved",
    };

    sessionId &&
      updateSession(sessionId, value)
        .then(() => {
          toast.success("Session Approved successfully");
          handleGetSessionRequest();
        })
        .catch((err: any) => {
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
          handleGetSessionRequest();
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
      <ConfirmApproval
        opened={approvalModal}
        close={() => setApprovalModal(false)}
        callback={() => {}}
        handleClick={handleApproveSessionRequest}
        btnText="approve session request"
      />
      <ConfirmDisapproval
        opened={disApprovalModal}
        close={() => setDisapprovalModal(false)}
        callback={() => {}}
        handleClick={handleDisApproveSessionRequest}
        btnText="Disapprove session request"
      />
      <AssignTutorModal
        tutors={tutors}
        close={close}
        opened={opened}
        handleAssignTutors={handleAssignTutors}
        setTutorId={setTutorId}
        tutorId={tutorId}
      />
      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Session</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Tutor</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sessions &&
              sessions.data.map((session) => (
                <Table.Tr key={session._id}>
                  <Table.Td>
                    {session.studentId?.firstName} {session.studentId?.lastName}
                  </Table.Td>
                  <Table.Td>{session.title}</Table.Td>
                  <Table.Td>
                    {moment(session.date).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>{convertTo12HourClock(session.time)}</Table.Td>
                  <Table.Td>
                    {session.tutorId
                      ? session?.tutorId?.fullName
                      : "Not assigned"}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      className="min-w-[100px] py-2"
                      color={
                        session.status === "approved"
                          ? "green"
                          : session.status === "pending"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {session.status}
                    </Badge>
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
                        {session.status !== "approved" && (
                          <Menu.Item
                            onClick={() => {
                              setApprovalModal(true);
                              setSessionId(session._id);
                            }}
                          >
                            Approve
                          </Menu.Item>
                        )}

                        <Menu.Item
                          onClick={() => {
                            setDisapprovalModal(true);
                            setSessionId(session._id);
                          }}
                        >
                          Disapprove
                        </Menu.Item>

                        {!session.tutorId && (
                          <Menu.Item
                            onClick={() => {
                              open();
                              setSessionId(session._id);
                            }}
                          >
                            Assign Tutor
                          </Menu.Item>
                        )}
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

export default SessionRequestTable;
