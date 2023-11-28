import { useState, Fragment } from "react";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { subjects } from "../../../components/data";
import { sendReport } from "../../../services/report";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";

const ReportIssues = () => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      email: "",
      category: "",
      subject: "",
      issue: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    sendReport(values)
      .then(() => {
        toast.success("Report successfully submitted");
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
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Report Issue
        </div>
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <div className="mt-10 max-w-[1000px] mx-auto px-6 lg:px-8">
            <TextInput
              required
              type="email"
              size="md"
              mt={16}
              placeholder="Enter your email"
              {...form.getInputProps("email")}
            />
            <Select
              required
              size="md"
              mt={16}
              placeholder="Choose Issue Category"
              data={[
                { label: "Bad service", value: "bad service" },
                { label: "Refund", value: "refund" },
                { label: "Low quality content", value: "low quality content" },
              ]}
              {...form.getInputProps("category")}
            />
            <Select
              required
              size="md"
              mt={16}
              placeholder="Choose Subject  "
              data={subjects.map((subject) => subject)}
              searchable
              {...form.getInputProps("subject")}
            />
            <Textarea
              required
              mt={16}
              placeholder="Let us know about your issue."
              autosize
              minRows={6}
              size="sm"
              className=""
              {...form.getInputProps("issue")}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              size="md"
              mt={42}
              className="bg-primary w-1/2 mx-auto hover:bg-primary/90"
            >
              Submit Issue
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ReportIssues;
