import { Button, Modal, Select } from "@mantine/core";
import { TutorTypes } from "../../../../../types/admins/tutor";
import { useState } from "react";

type IProps = {
  opened: boolean;
  close: () => void;
  tutors: TutorTypes[];
  handleAssignTutors: (id: string) => void;
};

const AssignTutorModal = ({
  close,
  opened,
  tutors,
  handleAssignTutors,
}: IProps) => {
  const [tutorId, setTutorId] = useState<string | null>("");

  console.log(tutorId);

  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title="Assign Tutor"
      centered
      opened={opened}
      onClose={close}
    >
      <Select
        searchable
        size="md"
        required
        mt={19}
        value={tutorId}
        data={tutors?.map((item) => ({
          label: item?._id,
          value: item?._id,
        }))}
        onChange={setTutorId}
      />
      <div className="flex justify-end mt-10">
        <Button
          size="md"
          className="bg-primary"
          onClick={() => tutorId && handleAssignTutors(tutorId)}
        >
          Assign Tutor
        </Button>
      </div>
    </Modal>
  );
};

export default AssignTutorModal;
