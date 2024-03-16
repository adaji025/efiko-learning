import {
  Divider,
  LoadingOverlay,
  Menu,
  Pagination,
  Select,
  Table,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ViewIssues from "./ViewIssues";
import Confirmation from "../../../../../components/Confirmation";
import { ReportState, ReportTypes } from "../../../../../types/admins/report";
import useNotification from "../../../../../hooks/useNotification";
import { resolveReport } from "../../../../../services/admin/report";
import { toast } from "react-toastify";

type IProps = {
  reports: ReportState | null;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>
  handleGetReport: () => void;
};

const IssuesTable = ({
  reports,
  limit,
  skip,
  setSkip,
  setLimit,
  handleGetReport,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [resolveModal, setResolveModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [report, setReport] = useState<ReportTypes | null>(null);

  useEffect(() => {
    if (reports) setTotalPages(Math.ceil(reports.total / limit));
  }, [reports]);

  const { handleError } = useNotification();

  const handleMarkAsResolve = () => {
    setLoading(true);

    const values = {
      status: "Resolved",
    };
    report &&
      resolveReport(report?._id, values)
        .then(() => {
          toast.success(`Issue marked as resolved`);
          close();
          handleGetReport();
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
      <ViewIssues close={close} opened={opened} report={report} />
      <Confirmation
        btnText="mark as resolve"
        close={() => setResolveModal(false)}
        handleClick={handleMarkAsResolve}
        opened={resolveModal}
      />

      <LoadingOverlay visible={loading} />
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
            {reports?.data.map((report, i) => (
              <Table.Tr key={i}>
                <Table.Td>
                  {report.reportedBy.firstName}
                  {report.reportedBy.lastName}
                  {report.reportedBy.fullName}
                </Table.Td>
                <Table.Td>{report.title}</Table.Td>
                <Table.Td>{report.reportedBy.email}</Table.Td>
                <Table.Td>{report.status}</Table.Td>
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
                          setReport(report);
                        }}
                      >
                        View
                      </Menu.Item>
                      {report.status === "Pending" && (
                        <Fragment>
                          <Divider />
                          <Menu.Item
                            onClick={() => {
                              setReport(report);
                              setResolveModal(true);
                            }}
                          >
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

        {reports && (reports.data.length === 0 || !reports) && (
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

export default IssuesTable;
