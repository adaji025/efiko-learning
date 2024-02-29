import { Modal } from "@mantine/core";
import { ReportTypes } from "../../../../../types/admins/report";

type IProps = {
  opened: boolean;
  close: () => void;
  report: ReportTypes | null;
};

const ViewIssues = ({ close, opened, report }: IProps) => {
  return (
    <Modal centered opened={opened} onClose={close} title="Reports">
      <div>
        <span className="font-semibold">Reported by: </span>
        {report?.reportedBy.fullName}
        {report?.reportedBy.firstName}
        {report?.reportedBy.lastName}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Title:</span> {report?.title}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Description:</span>{" "}
        {report?.description}
      </div>
    </Modal>
  );
};

export default ViewIssues;
