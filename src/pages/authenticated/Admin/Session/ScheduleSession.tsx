import { Fragment, useState, useRef, useEffect } from "react";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  LoadingOverlay,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCallback } from "react";
import useNotification from "../../../../hooks/useNotification";
import { addSession } from "../../../../services/session";
import { subjects } from "../../../../components/data";
import SchedulePreviews from "./components/SchedulePreviews";
import { CurriculumTypes } from "../../../../types/curriculum";
import { getAllCurriculums } from "../../../../services/admin/curriculum";

const ScheduleSession = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [curriculum, setCurriculum] = useState<CurriculumTypes[]>([]);
  const timeRef = useRef<HTMLInputElement>(null);
  const { handleError } = useNotification();

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
      duration: "",
      curriculumId: "",
    },
  });

  const validate = useCallback((): boolean => {
    if (
      form.values.title === "" ||
      form.values.category === "" ||
      form.values.outcome === "" ||
      form.values.time === "" ||
      form.values.description === ""
    )
      return true;
    return false;
  }, [form.values]);


  useEffect(() => {
    handleGetCurriculum();
  }, []);

  const handleGetCurriculum = () => {
    setLoading(true);
    getAllCurriculums()
      .then((res: any) => {
        setCurriculum(res.data.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submit = (values: any) => {
    setLoading(true);

    addSession(values)
      .then(() => {
        toast.success("Session created successfully");
        form.reset();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(values);
  };

  const previewData = form.values;

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      {!preview && (
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
            <Select
              required
              size="md"
              mt={16}
              label="Curriculum"
              data={curriculum.map((item) => ({
                label: item.title,
                value: item._id,
              }))}
              searchable
              {...form.getInputProps("curriculumId")}
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
                // @ts-ignore
                minDate={new Date().toJSON().slice(0, 10)}
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
              />
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <NumberInput
                hideControls
                mt={16}
                size="md"
                required
                label="Session duration"
                placeholder="Enter duration in minutes"
                className="flex-1"
                {...form.getInputProps("duration")}
              />
            </div>

            <div className="flex gap-10 mt-12 justify-btween">
              <Button
                variant="outline"
                size="md"
                className="text-primary w-1/2 mx-auto disabled:border border-primary disabled:text-primary/80"
                disabled={validate()}
                onClick={() => setPreview(true)}
              >
                Preview Session Details
              </Button>
              <Button
                type="submit"
                size="md"
                className="bg-primary w-1/2 mx-auto"
                disabled={validate()}
              >
                Schedule Session
              </Button>
            </div>
          </form>
        </div>
      )}

      {preview && (
        <SchedulePreviews
          setPreview={setPreview}
          previewData={previewData}
          curriculum={curriculum}
        />
      )}
    </Fragment>
  );
};

export default ScheduleSession;
