import { Modal } from "@mantine/core";

type IProps = {
  opened: boolean;
  close: () => void;
};

const ViewIssues = ({ close, opened }: IProps) => {
  return (
    <Modal centered opened={opened} onClose={close} title="Reports">
      <div>
        <span className="font-semibold">Reported by: </span>John Doe
      </div>
      <div className="mt-2">
        <span className="font-semibold">Title:</span> Payment Issues
      </div>
      <div className="mt-2">
        <span className="font-semibold">Description:</span> Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Culpa quas nam maiores placeat
        libero? Iusto!
      </div>
    </Modal>
  );
};

export default ViewIssues;
