import { LoadingOverlay, Menu, Pagination, Table } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ConfirmaApproval from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import AssignTutorModal from "./AssignTutorModal";
import { getAllTutors } from "../../../../../services/admin/tutors";
import useNotification from "../../../../../hooks/useNotification";
import { TutorTypes } from "../../../../../types/admins/tutor";
import { AdminSessionState } from "../../../../../types/admins/session";
import moment from "moment";
import { updateSession } from "../../../../../services/session";
import { toast } from "react-toastify";

type SessionProps = {
  sessions: AdminSessionState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetSessionRequest: () => void;
};

const SessionRequestTable = ({
  limit,
  sessions,
  setSkip,
  skip,
  handleGetSessionRequest,
}: SessionProps) => {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [approvalModal, setApprovalModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [tutors, setTutors] = useState<TutorTypes[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  console.log(sessions);

  const { handleError } = useNotification();

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
      <ConfirmaApproval
        opened={approvalModal}
        close={() => setApprovalModal(false)}
        callback={() => {}}
        handleClick={handleApproveSessionRequest}
        btnText="approve session request"
      />
      <AssignTutorModal
        tutors={tutors}
        close={close}
        opened={opened}
        handleAssignTutors={handleAssignTutors}
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
                  <Table.Td>{session.studentId.email}</Table.Td>
                  <Table.Td>{session.title}</Table.Td>
                  <Table.Td>
                    {moment(session.timeAndDate).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>{moment(session.timeAndDate).format("HH : MM")}</Table.Td>
                  <Table.Td>{session?.tutorId?.fullName}</Table.Td>
                  <Table.Td>{session.status}</Table.Td>
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
                          onClick={() => {
                            setApprovalModal(true);
                            setSessionId(session._id);
                          }}
                        >
                          Aprrove
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            open();
                          }}
                        >
                          Assign Tutor
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

export default SessionRequestTable;
