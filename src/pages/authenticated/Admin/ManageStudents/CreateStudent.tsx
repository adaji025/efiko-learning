import {
  Button,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Fragment } from "react";
import { countryList } from "../../../../utils/country";
import { subjects } from "../../../../components/data";

const CreateStudent = () => {
  const form = useForm({
    initialValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
    },
  });
  return (
    <Fragment>
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Onboard Students
        </div>
        <div className="px-4 lg:px-10">
          <div className=" mt-10 grid gap-5 grid-cols-3">
            <TextInput
              required
              size="md"
              label="First Name"
              placeholder="Enter first name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              required
              size="md"
              label="Last Name"
              placeholder="Enter last name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              required
              type="email"
              size="md"
              label="Email"
              placeholder="Enter email"
            />
            <TextInput
              required
              size="md"
              label="Phone number"
              placeholder="Enter phone number"
            />
            <NumberInput
              hideControls
              required
              size="md"
              label="Age"
              {...form.getInputProps("age")}
            />

            <Select
              required
              size="md"
              label="Country"
              data={countryList.map((country) => country)}
              searchable
              {...form.getInputProps("country")}
            />

            {/* <Select
            required
            size="md"
            label="Education"
            data={qaulification.map((qaulification) => qaulification)}
            {...form.getInputProps("education")}
          /> */}

            <MultiSelect
              required
              mt={16}
              size="md"
              label="Subjects you are interested in"
              data={subjects.map((subject) => subject)}
              searchable
              {...form.getInputProps("subject")}
            />
            {/* {validateTwo() && (
            <div className="text-xs text-red-500">
              Select at least 6 subjects
            </div>
          )} */}
          </div>
          <div className="mt-10 flex justify-end">
            <Button size="md" className="bg-primary min-w-[200px]">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
