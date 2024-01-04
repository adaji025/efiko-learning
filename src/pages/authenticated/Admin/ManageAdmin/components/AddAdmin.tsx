import { useState, Fragment, useEffect } from "react";
import {
  Modal,
  Title,
  TextInput,
  Select,
  LoadingOverlay,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useNotification from "../../../../../hooks/useNotification";
import { addAdmin, updateAdmin } from "../../../../../services/admin";
import { toast } from "react-toastify";
import { AdminTypes } from "../../../../../types/admins/admin";

type Props = {
  opened: boolean;
  close: () => void;
  callback: () => void;
  admin?: AdminTypes | null;
};

const AddAdmin = ({ close, opened, callback, admin }: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      accountType: "",
    },
  });

  useEffect(() => {
    form.setValues({
      fullName: admin ? admin.fullName : "",
      email: admin ? admin.email : "",
      accountType: admin ? admin.accountType : "",
    });
  }, [admin]);

  const handleAddAdmin = (values: any) => {
    setLoading(true);

    addAdmin(values)
      .then(() => {
        toast.success("Admin added successfully");
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

  const handleUpdateAdmin = (values: any) => {
    setLoading(true);

    admin &&
      updateAdmin(admin?._id, values)
        .then(() => {
          toast.success("Admin updated successfully");
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
            admin ? handleUpdateAdmin(values) : handleAddAdmin(values);
          })}
        >
          <Title order={3} ta="center">
            Please enter new admin details
          </Title>
          <TextInput
            required
            mt={8}
            label="Full name"
            placeholder="Example name"
            {...form.getInputProps("fullName")}
          />
          <TextInput
            required
            type="email"
            mt={8}
            label="Email"
            placeholder="example@gmail.com"
            {...form.getInputProps("email")}
          />
          <Select
            required
            mt={8}
            label="Admin Type"
            placeholder="Select admin type"
            data={[
              { label: "Normal Admin", value: "normalAdmin" },
              { label: "Super Admin", value: "superAdmin" },
            ]}
            {...form.getInputProps("accountType")}
          />

          <div className="flex justify-end">
            <Button size="md" type="submit" mt={16} className="bg-primary">
              {admin ? "Update admin" : "Add Admin"}
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddAdmin;
