import { LoadingOverlay, Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment, useEffect, useState } from "react";
import Confirmation from "../../../../../components/Confirmation";
import ConfirmActivate from "../../../../../components/Confirmation";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { TutorState, TutorTypes } from "../../../../../types/admins/tutor";
import {
  approve_Reject_tutor,
  changeTutorActiveState,
} from "../../../../../services/admin/tutors";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";

type IProps = {
  tutors: TutorState | null;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetTutors: () => void;
};

const TutorTable = ({
  tutors,
  limit,
  setSkip,
  skip,
  handleGetTutors,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [activate, setActivate] = useState(false);
  const [action, setAction] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [tutor, setTutor] = useState<TutorTypes | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const { handleError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (tutors) setTotalPages(Math.ceil(tutors?.total / limit));
  }, [tutors, limit]);

  const handleApprove_Reject_tutor = () => {
    setLoading(true);
    const value = {
      approvalStatus,
    };
    tutor &&
      approve_Reject_tutor(tutor?._id, value)
        .then(() => {
          toast.success(
            `Tutor successfully ${
              action === "Approved" ? "Approved" : "Rejected"
            }`
          );
          handleGetTutors();
          close();
        })
        .catch((err: any) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const handleChangeTutorsStatus = () => {
    setLoading(true);
    const value = {
      status: action,
    };
    tutor &&
      changeTutorActiveState(tutor?._id, value)
        .then(() => {
          toast.success(
            `Student successfully ${
              action === "Activate" ? "deactivated" : "activated"
            }`
          );
          handleGetTutors();
          close();
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
      <Confirmation
        opened={opened}
        close={close}
        handleClick={handleApprove_Reject_tutor}
        btnText={`${approvalStatus === "Approved" ? "Approve" : "Reject"}`}
      />
      <ConfirmActivate
        opened={activate}
        close={() => setActivate(false)}
        handleClick={handleChangeTutorsStatus}
        btnText={`${action} tutor`}
      />
      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>Sessions completed</Table.Th>
              <Table.Th>status</Table.Th>
              <Table.Th>Approval status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tutors &&
              tutors.data.map((tutor) => (
                <Table.Tr key={tutor._id}>
                  <Table.Td
                    className="cursor-pointer"
                    onClick={() => navigate("view-tutor")}
                  >
                    {tutor.fullName}
                  </Table.Td>
                  <Table.Td>{tutor.email}</Table.Td>
                  <Table.Td>5</Table.Td>
                  <Table.Td>{tutor.status} </Table.Td>
                  <Table.Td>
                    <span
                      className={`${
                        tutor.approvalStatus === "Rejected" && "text-red-500"
                      }`}
                    >
                      {tutor.approvalStatus}
                    </span>
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
                            navigate("view-tutor", { state: tutor })
                          }
                        >
                          View
                        </Menu.Item>
                        {tutor.approvalStatus === "Pending" && (
                          <Fragment>
                            <Menu.Item
                              onClick={() => {
                                open();
                                setApprovalStatus("Approved");
                                setTutor(tutor);
                              }}
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => {
                                open();
                                setApprovalStatus("Rejected");
                                setTutor(tutor);
                              }}
                            >
                              Reject
                            </Menu.Item>
                          </Fragment>
                        )}

                        {tutor.approvalStatus === "Approved" && (
                          <Menu.Item
                            onClick={() => {
                              setActivate(true);
                              setTutor(tutor);
                              tutor.status === "Active"
                                ? setAction("Inactive")
                                : setAction("Active");
                            }}
                          >
                            {tutor.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </Menu.Item>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {!tutors && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No record available.</div>
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

export default TutorTable;
