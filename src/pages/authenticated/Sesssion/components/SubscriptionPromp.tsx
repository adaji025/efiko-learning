import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";

type IProps = {
  opened: boolean;
  close: () => void;
};

const SubscriptionPromp = ({ close, opened }: IProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      opened={opened}
      onClose={close}
    >
      <div className="text-center">
        You do not have an active{" "}
        <span className="font-bold text-xl">subscription </span>
          </div>
          <div
          className="underline cursor-pointer text-center mt-2 mb-4 text-primary"
          onClick={() => navigate("/payments")}
        >
          go to subscription page
        </div>
    </Modal>
  );
};

export default SubscriptionPromp;
