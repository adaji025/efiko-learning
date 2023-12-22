import { Fragment, useEffect, useRef, useState } from "react";
import {
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Button,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useLocation, useNavigate } from "react-router-dom";
import { SessionTypes } from "../../../../types/session";
import { subjects } from "../../../../components/data";
import { FaRegClock } from "react-icons/fa6";
import { updateSession } from "../../../../services/session";
import useNotification from "../../../../hooks/useNotification";
import { toast } from "react-toastify";

const EditSession = () => {
  const [loading, setLoading] = useState(false);
  const timeRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const edit: SessionTypes = location.state;

  const userId = localStorage.getItem("userId") ?? "";
  const { handleError } = useNotification();
  const navigate = useNavigate();

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => timeRef.current?.showPicker()}
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

  useEffect(() => {
    form.setValues({
      title: edit ? edit.title : "",
      category: edit ? edit.category : "",
      description: edit ? edit.description : "",
      outcome: edit ? edit.outcome : "",
      date: new Date(edit.date),
      time: edit ? edit.time : "",
      // @ts-ignore
      charges: edit ? edit.charges : null,
    });
  }, [edit]);

  const submit = (values: any) => {
    setLoading(true);

    updateSession(userId, values)
      .then(() => {
        toast.success("Session updated successfully");
        form.reset();
        navigate("/upcoming-sessions");
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
          Schedule Sesion
        </div>
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <div className="mt-10 px-4 lg:px-10 max-w-[1000px]">
            <TextInput
              required
              size="md"
              label="Title of the session"
              {...form.getInputProps("title")}
              defaultValue={edit.title}
            />
            <Select
              required
              size="md"
              mt={16}
              label="Subject Category"
              data={subjects.map((subject) => subject)}
              searchable
              {...form.getInputProps("category")}
              defaultValue={edit.category}
            />
            <Textarea
              mt={16}
              label="Session Description"
              autosize
              minRows={6}
              size="sm"
              className=""
              {...form.getInputProps("description")}
              defaultValue={edit.description}
            />

            <Textarea
              mt={16}
              label="Learning Outcome"
              autosize
              minRows={6}
              size="sm"
              className=""
              {...form.getInputProps("outcome")}
              defaultValue={edit.outcome}
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
                defaultValue={new Date(edit.date)}
              />
              <TimeInput
                ref={timeRef}
                size="md"
                required
                mt={16}
                label="Session Time"
                placeholder="Pick time"
                className="flex-1"
                rightSection={pickerControl}
                {...form.getInputProps("time")}
                defaultValue={edit.time}
              />
              <NumberInput
                hideControls
                size="md"
                required
                label="Session Charges"
                placeholder="Enter Price"
                className="flex-1"
                defaultValue={Number(edit.charges)}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="md"
                mt={30}
                className="bg-primary w-1/2 mx-auto"
              >
                Update Session
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditSession;
