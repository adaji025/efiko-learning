import { useState, Fragment, useEffect } from "react";
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
import { toast } from "react-toastify";
import {
  addSubscription,
  updateSubscription,
} from "../../../../../services/admin/subscription";
import { SubscriptionTypes } from "../../../../../types/admins/subscription";

type Props = {
  opened: boolean;
  close: () => void;
  callback: () => void;
  subscription?: SubscriptionTypes | null;
};

const AddSubscription = ({ close, opened, callback, subscription }: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      title: "",
      amount: "",
      type: "",
    },
  });

  useEffect(() => {
    form.setValues({
      title: subscription ? subscription.title : "",
      amount: subscription ? subscription.amount : "",
      type: subscription ? subscription.type : "",
    });
  }, [subscription]);

  const handleAddSubscription = (values: any) => {
    setLoading(true);

    addSubscription(values)
      .then(() => {
        toast.success("Subscription added successfully");
        close();
        callback();
        form.reset();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateSubscription = (values: any) => {
    setLoading(true);

    subscription &&
      updateSubscription(subscription._id, values)
        .then(() => {
          toast.success("Subscription updated successfully");
          close();
          callback();
          form.reset();
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
        <form
          onSubmit={form.onSubmit((values) => {
            subscription
              ? handleUpdateSubscription(values)
              : handleAddSubscription(values);
          })}
        >
          <Title order={3} ta="center">
            Please enter new subscriptions details
          </Title>
          <TextInput
            required
            mt={8}
            label="Title"
            placeholder="Example name"
            {...form.getInputProps("title")}
          />
          <NumberInput
            hideControls
            required
            mt={8}
            label="Amount"
            placeholder="Enter amount"
            {...form.getInputProps("amount")}
          />
          <Select
            required
            mt={8}
            label="Subscription Type"
            placeholder="Select subscription type"
            data={[
              { label: "Weekly", value: "Weekly" },
              { label: "Bi-Weekly", value: "Bi-Weekly" },
              { label: "Tri-Weekly", value: "Tri-Weekly" },
              { label: "Monthly", value: "Monthly" },
              { label: "Bi-Monthly", value: "Bi-Monthly" },
              { label: "Quarterly", value: "Quarterly" },
              { label: "Semi-Annually", value: "Semi-Annually" },
              { label: "Annually", value: "Annually" },
            ]}
            {...form.getInputProps("type")}
          />

          <div className="flex justify-end">
            <Button type="submit" mt={16} className="bg-primary">
              {subscription? "Update" : "Add"} Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddSubscription;
