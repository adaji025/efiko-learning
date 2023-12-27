import { useState, Fragment } from "react";
import {
  Modal,
  Title,
  TextInput,
  Select,
  LoadingOverlay,
  Button,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useNotification from "../../../../../hooks/useNotification";
import { addAdmin } from "../../../../../services/admin";
import { toast } from "react-toastify";

type Props = {
  opened: boolean;
  close: () => void;
  callback: () => void;
};

const AddSubscription = ({ close, opened, callback }: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      accountType: "",
      password: "admin",
    },
  });

  const submit = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", form.values.fullName);
    formData.append("email", form.values.email);
    formData.append("accountType", form.values.accountType);
    formData.append("password", form.values.password);

    addAdmin(formData)
      .then(() => {
        toast.success("Admin added successfully");
        close();
        callback();
        form.reset();
      })
      .catch((err) => {
        handleError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <Modal
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        opened={opened}
        onClose={close}
        title="Authentication"
      >
        <form onSubmit={form.onSubmit(submit)}>
          <Title order={3} ta="center">
            Please enter new subscriptions details
          </Title>
          <TextInput
            required
            mt={8}
            label="Title"
            placeholder="Example name"
            {...form.getInputProps("fullName")}
          />
          <NumberInput
            hideControls
            required
            mt={8}
            label="Amount"
            placeholder="Enter amount"
            {...form.getInputProps("email")}
          />
          <Select
            required
            mt={8}
            label="Admin Type"
            placeholder="Select admin type"
            data={[
              { label: "Bi-Weekly", value: "Bi-Weekly" },
              { label: "Tri-Weekly", value: "Tri-Weekly" },
              { label: "Monthly", value: "Monthly" },
              { label: "Bi-Monthly", value: "Bi-Monthly" },
              { label: "Quarterly", value: "Quarterly" },
              { label: "Semi-Annually", value: "Semi-Annually" },
              { label: "Annually", value: "Annually" },
            ]}
            {...form.getInputProps("accountType")}
          />

          <div className="flex justify-end">
            <Button type="submit" mt={16} className="bg-darkBlue">
              Add admin
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddSubscription;
