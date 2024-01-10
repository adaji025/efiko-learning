import { Button, Modal, Select } from "@mantine/core";
import { TutorTypes } from "../../../../../types/admins/tutor";

type IProps = {
  opened: boolean;
  close: () => void;
  tutors: TutorTypes[];
};

const AssignTutorModal = ({ close, opened, tutors }: IProps) => {

  console.log(tutors)
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
        data={tutors?.map((item) => ({
          label: item?._id,
          value: item?._id,
        }))}
      />
      <div className="flex justify-end mt-10">
        <Button size="md" className="bg-primary">
          Assign Tutor
        </Button>
      </div>
    </Modal>
  );
};

export default AssignTutorModal;
