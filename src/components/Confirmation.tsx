import { Button, Divider, Modal } from "@mantine/core";

export type IProps = {
  opened: boolean;
  close: () => void;
  btnText: string;
  handleClick: () => void;
  callback?: () => void;
};

const Confirmation = ({ close, handleClick, opened, btnText }: IProps) => {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      opened={opened}
      onClose={close}
      title={btnText}
    >
      <Divider mb={16} />
      <div className="text-lg font-medium">
        Are you sure you want to <span className="font-semibold">{btnText}</span> ?
      </div>
      <div className="flex gap-5 mb-5 mt-5 justify-center">
        <Button variant="outline" className="w-1/2" onClick={close}>
          Cancel
        </Button>
        <Button className="bg-primary flex-1 capitalize" onClick={handleClick}>
          {btnText}
        </Button>
      </div>
    </Modal>
  );
};

export default Confirmation;
