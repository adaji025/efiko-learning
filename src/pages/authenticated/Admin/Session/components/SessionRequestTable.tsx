import { Menu, Pagination, Table } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ConfirmaApproval from "../../../../../components/Confirmation";
import { useDisclosure } from "@mantine/hooks";
import AssignTutorModal from "./AssignTutorModal";
import { getAllTutors } from "../../../../../services/admin/tutors";
import useNotification from "../../../../../hooks/useNotification";
import { TutorTypes } from "../../../../../types/admins/tutor";

const sessionRequest = [
  {
    name: "john Doe",
    sessionTitle: "session 1",
    date: "2024-06-15",
    time: "14:14",
    status: "pending",
    tutor: "Jane Doe",
    _id: "one",
  },
  {
    name: "john Doe",
    sessionTitle: "session 1",
    date: "2024-06-15",
    time: "14:14",
    status: "pending",
    tutor: "not assigned",
    _id: "two",
  },
];

const SessionRequestTable = () => {
  const [approvalModal, setApprovalModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [tutors, setTutors] = useState<TutorTypes[] >([])
  
  const {handleError} = useNotification()

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
      })
      
  };
  return (
    <Fragment>
      <ConfirmaApproval
        opened={approvalModal}
        close={() => setApprovalModal(false)}
        callback={() => {}}
        handleClick={() => {}}
        btnText="approve session request"
      />
      <AssignTutorModal tutors={tutors} close={close} opened={opened} />
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
            {sessionRequest &&
              sessionRequest.map((session) => (
                <Table.Tr key={session._id}>
                  <Table.Td>{session.name}</Table.Td>
                  <Table.Td>{session.sessionTitle}</Table.Td>
                  <Table.Td>{session.date}</Table.Td>
                  <Table.Td>{session.time}</Table.Td>
                  <Table.Td>{session.tutor}</Table.Td>
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
        {sessionRequest && (sessionRequest.length === 0 || !sessionRequest) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination
          total={20}
          siblings={1}
          value={1}
          onChange={() => {}}
          className="text-primary"
        />
      </div>
    </Fragment>
  );
};

export default SessionRequestTable;
