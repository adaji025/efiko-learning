import {
  Button,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Fragment, useState } from "react";
import { countryList } from "../../../../utils/country";
import { subjects } from "../../../../components/data";
import { addStudent } from "../../../../services/admin/students";
import { toast } from "react-toastify";
import useNotification from "../../../../hooks/useNotification";

const CreateStudent = () => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      country: "",
      subjectInterest: [],
      accountType: "student",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    addStudent(values)
      .then(() => {
        toast.success(`Student added successfully`);
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
      <div className="">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Onboard Students
        </div>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          className="px-4 lg:px-10"
        >
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
              {...form.getInputProps("lastName")}
            />
            <TextInput
              required
              type="email"
              size="md"
              label="Email"
              placeholder="Enter email"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              size="md"
              label="Phone number"
              placeholder="Enter phone number"
              {...form.getInputProps("phone")}
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

            <MultiSelect
              mt={16}
              size="md"
              label="Subjects you are interested in"
              data={subjects.map((subject) => subject)}
              searchable
              {...form.getInputProps("subjectInterest")}
            />
          </div>
          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              size="md"
              className="bg-primary min-w-[200px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
