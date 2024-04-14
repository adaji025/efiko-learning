import { useState, useCallback, Fragment } from "react";
import {
  Stepper,
  Button,
  TextInput,
  Select,
  MultiSelect,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import ImageDropzone from "../../../components/ImageDropzone";
import { countryList } from "../../../utils/country";
import { useNavigate } from "react-router-dom";
import { majors, subjects } from "../../../components/data";
import { profileSetUp } from "../../../services/user";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";
import { DateInput } from "@mantine/dates";

const StudentProfilSetup = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  console.log(files[0]);

  const { handleError } = useNotification();

  const id = localStorage.getItem("userId") ?? "";

  const navigate = useNavigate();

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      country: "",
      education: "",
      careerInterest: "",
      subjectOfInterest: [],
    },
    validate: {
      lastName: (value) => (value === "" ? "Input full name" : null),
      firstName: (value) => (value === "" ? "Input full name" : null),
      country: (value) => (value === "" ? "Input Country" : null),
      dateOfBirth: (value) => (value === "" ? "Input age" : null),
      education: (value) => (value === "" ? "Input Education" : null),
      careerInterest: (value) =>
        value === "" ? "Input career of Interest" : null,
      subjectOfInterest: (value) =>
        value.length < 6 ? "Input subject Of Interest" : null,
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular key-value pairs
    formData.append("image", files[0]);
    formData.append("firstName", form.values.firstName);
    formData.append("lastName", form.values.lastName);
    formData.append("age", form.values.dateOfBirth);
    formData.append("country", form.values.country);
    formData.append("subjectOfInterest", form.values.country);

    // Append nested object key-value pairs
    formData.append("studentEducationDetails.education", form.values.education);
    formData.append(
      "studentEducationDetails.careerInterest",
      form.values.careerInterest
    );

    // Append array elements
    form.values.subjectOfInterest.forEach((subject, index) => {
      formData.append(
        `studentEducationDetails.subjectOfInterest[${index}]`,
        subject
      );
    });

    profileSetUp(id, formData)
      .then(() => {
        toast.success("Profile set up was successful");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = useCallback((): boolean => {
    if (
      form.values.lastName === "" ||
      form.values.firstName === "" ||
      form.values.dateOfBirth === "" ||
      form.values.country === "" ||
      files.length === 0
    )
      return true;
    return false;
  }, [form.values, files]);

  const validateTwo = useCallback((): boolean => {
    if (
      form.values.education === "" ||
      form.values.careerInterest === "" ||
      form.values.subjectOfInterest.length < 6
    )
      return true;
    return false;
  }, [form.values]);

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="pb-10 bg-gray-50">
        <div className="border-b">
          <img src={Logo} alt="" className="h-[100px]" />
        </div>
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold text-primary">Student Profile</h2>
          <div className="mt-2 max-w-[350px] mx-auto">
            Sign up with Efiko Learning and start your connection to your
            heritage
          </div>
        </div>

        <div className="mt-10 max-w-[600px] mx-auto px-6 lg:px-8">
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step disabled>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <ImageDropzone files={files} setFiles={setFiles} />
                <TextInput
                  required
                  mt={16}
                  size="md"
                  label="First Name"
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  required
                  mt={16}
                  size="md"
                  label="Last Name"
                  {...form.getInputProps("lastName")}
                />
                <DateInput
                  required
                  mt={16}
                  size="md"
                  label="Date of Birth"
                  {...form.getInputProps("dateOfBirth")}
                />

                <Select
                  required
                  mt={16}
                  size="md"
                  label="Country"
                  data={countryList.map((country) => country)}
                  searchable
                  {...form.getInputProps("country")}
                />

                <Button
                  size="md"
                  className="bg-primary w-full mt-10"
                  onClick={nextStep}
                  disabled={validate()}
                >
                  Next step
                </Button>
              </div>
            </Stepper.Step>
            <Stepper.Step disabled>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <Select
                  required
                  size="md"
                  label="Education"
                  data={[
                    { label: "Grade 1", value: "grade 1" },
                    { label: "Grade 2", value: "grade 2" },
                    { label: "Grade 3", value: "grade 3" },
                    { label: "Grade 4", value: "grade 4" },
                    { label: "Grade 5", value: "grade 5" },
                    { label: "Grade 6", value: "grade 6" },
                    { label: "Grade 7", value: "grade 7" },
                    { label: "Grade 8", value: "grade 8" },
                    { label: "Grade 9", value: "grade 9" },
                  ]}
                  {...form.getInputProps("education")}
                />

                <Select
                  required
                  mt={16}
                  size="md"
                  label="Career Interests"
                  searchable
                  data={majors.map((major) => major)}
                  {...form.getInputProps("careerInterest")}
                />

                <MultiSelect
                  required
                  mt={16}
                  size="md"
                  label="Subjects you are interested in"
                  data={subjects.map((subject) => subject)}
                  searchable
                  {...form.getInputProps("subjectOfInterest")}
                />
                {validateTwo() && (
                  <div className="text-xs text-red-500">
                    Select at least 6 subjects
                  </div>
                )}

                <div className="flex gap-5 mt-10">
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full"
                    onClick={prevStep}
                  >
                    Previous step
                  </Button>
                  <Button
                    size="md"
                    className="bg-primary w-full"
                    disabled={validateTwo()}
                    onClick={nextStep}
                  >
                    Next step
                  </Button>
                </div>
              </div>
            </Stepper.Step>
            <Stepper.Step disabled>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <div className="mt-6">
                  I agree to the{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  of the platform to start using it.
                </div>
                <Button
                  type="submit"
                  size="md"
                  className="bg-primary w-full mt-10"
                  onClick={(e) => {
                    handleSubmit(e);
                    nextStep();
                  }}
                >
                  Confirm
                </Button>
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[50px] py-10 rounded-xl max-w-[650px] w-full">
                <div>
                  Your profile is under review. As soon as admin will approve
                  your profile you will be eligible to start learning on the
                  platform.
                </div>
                <Button
                  size="md"
                  className="bg-primary w-full mt-10"
                  onClick={() => navigate("/dashboard")}
                >
                  Login
                </Button>
              </div>
            </Stepper.Completed>
          </Stepper>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentProfilSetup;
