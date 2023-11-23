import { Fragment } from "react";
import {
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Button,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";

const ScheduleSession = () => {
  return (
    <Fragment>
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Schedule Sesion
        </div>
        <div className="mt-10 px-4 lg:px-10 max-w-[1000px]">
          <TextInput required size="md" label="Title of the session" />
          <Select
            required
            size="md"
            mt={16}
            label="Subject Category"
            data={[
              { label: "one", value: "1" },
              { label: "tw0", value: "2" },
              { label: "three", value: "3" },
            ]}
          />
          <Textarea
            mt={16}
            label="Session Description"
            autosize
            minRows={6}
            size="sm"
            className=""
          />
          <div className="grid grid-cols-2 gap-[16px]">
            <DatePickerInput
              required
              size="md"
              mt={16}
              label="Pick date"
              placeholder="Pick date"
              className="flex-1"
            />
            <TimeInput
              size="md"
              required
              mt={16}
              label="Session Time"
              placeholder="Pick time"
              className="flex-1"
            />
            <NumberInput
              hideControls
              size="md"
              required
              label="Session Charges"
              placeholder="Enter Price"
              className="flex-1"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              size="md"
              mt={30}
              className="bg-primary w-1/2 mx-auto"
            >
              Schedule Session
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ScheduleSession;
