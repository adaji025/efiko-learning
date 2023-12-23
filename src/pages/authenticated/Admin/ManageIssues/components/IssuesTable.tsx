import { Divider, Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ViewIssues from "./ViewIssues";
import Confirmation from "../../../../../components/Confirmation";

type AdminProps = {
  issues: {
    name: string;
    email: string;
    status: string;
    title: string;
  }[];
};

const IssuesTable = ({ issues }: AdminProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [resolveModal, setResolveModal] = useState(false);
  return (
    <Fragment>
      <ViewIssues close={close} opened={opened} />
      <Confirmation
        btnText="mark as resolve"
        close={() => setResolveModal(false)}
        handleClick={() => {}}
        opened={resolveModal}
      />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {issues.map((issue, i) => (
              <Table.Tr key={i}>
                <Table.Td>{issue.name}</Table.Td>
                <Table.Td>{issue.title}</Table.Td>
                <Table.Td>{issue.email}</Table.Td>
                <Table.Td>{issue.status}</Table.Td>
                <Table.Td>
                  <Menu shadow="md" width={150}>
                    <Menu.Target>
                      <div className="pl-4">
                        <SlOptionsVertical
                          size={20}
                          className="cursor-pointer"
                        />
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Menu</Menu.Label>
                      <Divider />
                      <Menu.Item
                        onClick={() => {
                          open();
                        }}
                      >
                        View
                      </Menu.Item>
                      {issue.status === "pending" && (
                        <Fragment>
                          <Divider />
                          <Menu.Item onClick={() => setResolveModal(true)}>
                            Mark as resolve
                          </Menu.Item>
                        </Fragment>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {issues && (issues.length === 0 || !issues) && (
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

export default IssuesTable;
