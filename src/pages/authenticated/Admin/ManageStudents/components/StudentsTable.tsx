import { LoadingOverlay, Pagination, Select, Table } from "@mantine/core";
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
  setLimit: React.Dispatch<React.SetStateAction<number>>
  handleGetStudents: () => void;
};

const StudentsTable = ({
  students,
  limit,
  setSkip,
  skip,
  setLimit,
  handleGetStudents,
}: StudentProps) => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [student, setStudent] = useState<StudentsTypes | null>(null);
  const [action, setAction] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();


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
                    className={`max-w-[150px] w-full text-white px-4 py-2 rounded-md ${
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

export default StudentsTable;
