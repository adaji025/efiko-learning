import { Fragment, useState, useRef } from "react";
import {
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Button,
  LoadingOverlay,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { FaRegClock } from "react-icons/fa";
import { addSession } from "../../../services/session";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { subjects } from "../../../components/data";
import { useCallback } from "react";

const ScheduleSession = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { handleError } = useNotification();

  const navigate = useNavigate();

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <FaRegClock />
    </ActionIcon>
  );

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      description: "",
      outcome: "",
      date: new Date(),
      time: "",
      charges: null,
    },
  });

  const validate = useCallback((): boolean => {
    if (
      form.values.title === "" ||
      form.values.category === "" ||
      form.values.outcome === "" ||
      form.values.time === "" ||
      form.values.charges === "" ||
      form.values.description === ""
    )
      return true;
    return false;
  }, [form.values]);

  const submit = (values: any) => {
    setLoading(true);

    addSession(values)
      .then(() => {
        toast.success("Session created successfully");
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
          Schedule Sesions
        </div>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          className="mt-10 px-4 lg:px-10 max-w-[1000px]"
        >
          <TextInput
            required
            size="md"
            label="Title of the session"
            {...form.getInputProps("title")}
          />
          <Select
            required
            size="md"
            mt={16}
            label="Subject Category"
            data={subjects.map((subject) => subject)}
            searchable
            {...form.getInputProps("category")}
          />
          <Textarea
            mt={16}
            label="Session Description"
            autosize
            minRows={6}
            size="sm"
            className=""
            {...form.getInputProps("description")}
          />

          <Textarea
            mt={16}
            label="Learning Outcome"
            autosize
            minRows={6}
            size="sm"
            className=""
            {...form.getInputProps("outcome")}
          />
          <div className="grid grid-cols-2 gap-[16px]">
            <DatePickerInput
              required
              size="md"
              mt={16}
              label="Pick date"
              placeholder="Pick date"
              className="flex-1"
              {...form.getInputProps("date")}
            />
            <TimeInput
              ref={ref}
              size="md"
              required
              mt={16}
              label="Session Time"
              placeholder="Pick time"
              className="flex-1"
              rightSection={pickerControl}
              {...form.getInputProps("time")}
            />
            <NumberInput
              hideControls
              size="md"
              required
              label="Session Charges"
              placeholder="Enter Price"
              className="flex-1"
              {...form.getInputProps("charges")}
            />
          </div>

          <div className="flex gap-10 mt-12 justify-btween">
            <Button
              variant="outline"
              size="md"
              className="text-primary w-1/2 mx-auto disabled:border border-primary disabled:text-primary/80"
              disabled={validate()}
              onClick={() => {
                navigate(`/schedule-sessions/preview`);
                localStorage.setItem(
                  "scheduled_sessions",
                  JSON.stringify(form.values)
                );
              }}
            >
              Preview Session Details
            </Button>
            <Button
              type="submit"
              size="md"
              className="bg-primary w-1/2 mx-auto"
            >
              Schedule Session
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ScheduleSession;
