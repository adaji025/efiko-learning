import { Button, Modal, Select } from "@mantine/core";
import { studentTypes } from "../../../../../types/admins/session";

type IProps = {
  opened: boolean;
  close: () => void;
  students: studentTypes[];
  handleAssignStudent: (id: string) => void;
  studentId: string | null;
  setStudentId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AssignStudentModal = ({
  close,
  opened,
  students,
  handleAssignStudent,
  setStudentId,
  studentId,
}: IProps) => {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title="Assign Student"
      centered
      opened={opened}
      onClose={close}
    >
      <Select
        searchable
        size="md"
        required
        label="Tutor"
        placeholder="Select Student"
        mt={19}
        value={studentId}
        data={students?.map((item) => ({
          label: item?.firstName + " " + item.lastName,
          value: item?._id,
        }))}
        onChange={setStudentId}
      />
      <div className="flex justify-end mt-10">
        <Button
          size="md"
          className="bg-primary"
          onClick={() => studentId && handleAssignStudent(studentId)}
        >
          Assign Student
        </Button>
      </div>
    </Modal>
  );
};

export default AssignStudentModal;
