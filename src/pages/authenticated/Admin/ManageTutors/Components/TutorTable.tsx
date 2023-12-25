import { Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment, useState } from "react";
import Confirmation from "../../../../../components/Confirmation";
import ConfirmActivate from "../../../../../components/Confirmation";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

type IProps = {
  tutors: {
    name: string;
    email: string;
    status: string;
    suspend: boolean;
  }[];
};

const TutorTable = ({ tutors }: IProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activate, setActivate] = useState(false);
  const navigate = useNavigate();
  return (
    <Fragment>
      <Confirmation
        opened={opened}
        close={close}
        handleClick={() => {}}
        btnText="reject tutor"
      />
      <ConfirmActivate
        opened={activate}
        close={() => setActivate(false)}
        handleClick={() => {}}
        btnText="Activat tutor"
      />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>Sessions completed</Table.Th>
              <Table.Th>status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tutors.map((tutor, i) => (
              <Table.Tr key={i}>
                <Table.Td
                  className="cursor-pointer"
                  onClick={() => navigate("view-tutor")}
                >
                  {tutor.name}
                </Table.Td>
                <Table.Td>{tutor.email}</Table.Td>
                <Table.Td>5</Table.Td>
                <Table.Td>{tutor.status}</Table.Td>
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
                        onClick={() => navigate("view-tutor")}
                      >
                        View
                      </Menu.Item>
                      {tutor.status === "pending" && (
                        <Fragment>
                          <Menu.Item onClick={open}>Approve</Menu.Item>
                          <Menu.Item onClick={open}>Reject</Menu.Item>
                        </Fragment>
                      )}

                      {tutor.status !== "pending" && (
                        <Menu.Item>
                          {tutor.suspend ? "Deactivate" : "Activate"}
                        </Menu.Item>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {tutors && (tutors.length === 0 || !tutors) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination total={10} className="text-primary" />
      </div>
    </Fragment>
  );
};

export default TutorTable;
