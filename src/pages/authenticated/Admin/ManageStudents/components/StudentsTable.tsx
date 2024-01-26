import { LoadingOverlay, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { Fragment, useEffect, useState } from "react";
import ConfirmDisable from "../../../../../components/Confirmation";
import { useNavigate } from "react-router-dom";
import {
  StudentState,
  StudentsTypes,
} from "../../../../../types/admins/student";
import { changeStudentActiveState } from "../../../../../services/admin/students";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";

type StudentProps = {
  students: StudentState | null;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetStudents: () => void;
};

const StudentsTable = ({
  students,
  limit,
  setSkip,
  skip,
  handleGetStudents,
}: StudentProps) => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [student, setStudent] = useState<StudentsTypes | null>(null);
  const [action, setAction] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();

  console.log(students)

  useEffect(() => {
    if (students) setTotalPages(Math.ceil(students?.total / limit));
  }, [students, limit]);

  const handleChangeStudentStatus = () => {
    setLoading(true);
    const value = {
      action,
    };
    student &&
      changeStudentActiveState(student?._id, value)
        .then(() => {
          toast.success(
            `Student successfully ${
              action === "Activate" ? "deactivated" : "activated"
            }`
          );
          handleGetStudents();
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
      <ConfirmDisable
        opened={opened}
        btnText={`${action} student`}
        close={close}
        handleClick={handleChangeStudentStatus}
      />

      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>status</Table.Th>

              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {students?.data.map((student, i) => (
              <Table.Tr key={i}>
                <Table.Td
                  className="cursor-pointer"
                  onClick={() => navigate("view-student", { state: student })}
                >
                  {student.firstName} {student.lastName}
                </Table.Td>
                <Table.Td>{student.email}</Table.Td>
                <Table.Td>{student.status}</Table.Td>
                <Table.Td>
                  <button
                    className={` w-full xl:w-1/2 text-white px-4 py-2 rounded-md ${
                      student.status === "Active" ? "bg-red-400" : "bg-primary"
                    }`}
                    onClick={() => {
                      open();
                      setStudent(student);
                      student.status === "Active"
                        ? setAction("Deactivate")
                        : setAction("Activate");
                    }}
                  >
                    {student.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {students && (students.data.length === 0 || !students) && (
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

export default StudentsTable;
