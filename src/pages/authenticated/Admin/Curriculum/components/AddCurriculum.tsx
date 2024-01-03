import { useState, Fragment } from "react";
import {
  Modal,
  Title,
  TextInput,
  LoadingOverlay,
  Button,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useNotification from "../../../../../hooks/useNotification";
import { toast } from "react-toastify";
import Upload from "./Upload";
import { useDropzone } from "react-dropzone";
import { addCurriculum } from "../../../../../services/admin/curriculum";

type Props = {
  opened: boolean;
  close: () => void;
  callback: () => void;
};

const AddCurriculum = ({ close, opened, callback }: Props) => {
  const [loading, setLoading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "application/pdf": [".pdf"] },
  });

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("pdf", acceptedFiles[0]);

    addCurriculum(formData)
      .then(() => {
        toast.success("Curriculum added successfully");
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
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <Title order={3} ta="center">
            Please enter curriculum details
          </Title>
          <TextInput
            required
            mt={8}
            label="title"
            placeholder="Example ttle"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mt={8}
            label="Description"
            placeholder="Enter description"
            {...form.getInputProps("email")}
          />

          <div className="mt-3">
            <Upload {...{ getInputProps, getRootProps, acceptedFiles }} />
          </div>

          <div className="flex justify-end">
            <Button size="md" type="submit" mt={16} className="bg-primary">
              Create Curriculum
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddCurriculum;
