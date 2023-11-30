import { useState, useRef, useCallback, Fragment } from "react";
import {
  Stepper,
  Button,
  TextInput,
  Select,
  MultiSelect,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import ImageDropzone from "../../../components/ImageDropzone";
import { countryList } from "../../../utils/country";
import { useNavigate } from "react-router-dom";
import { majors, qaulification, subjects } from "../../../components/data";
import { profileSetUp } from "../../../services/user";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";

const StudentProfilSetup = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotification();

  const id = localStorage.getItem("userId") ?? "";

  const navigate = useNavigate();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const form = useForm({
    initialValues: {
      fullName: "",
      age: "",
      country: "",
      education: "",
      majors: "",
      subject: [],
    },
    validate: {
      fullName: (value) => (value === "" ? "Input full name" : null),
      country: (value) => (value === "" ? "Input Country" : null),
      age: (value) => (value === "" ? "Input age" : null),
      education: (value) => (value === "" ? "Input Education" : null),
      majors: (value) => (value === "" ? "Input Majors" : null),
      subject: (value) => (value.length < 6 ? "Input Majors" : null),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular key-value pairs
    formData.append("fullName", form.values.fullName);
    formData.append("age", form.values.age);
    formData.append("country", form.values.country);

    // Append nested object key-value pairs
    formData.append("studentEducationDetails.education", form.values.education);
    formData.append("studentEducationDetails.majors", form.values.majors);

    // Append array elements
    form.values.subject.forEach((subject, index) => {
      formData.append(`studentEducationDetails.subject[${index}]`, subject);
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
      form.values.fullName === "" ||
      form.values.age === "" ||
      form.values.country === ""
    )
      return true;
    return false;
  }, [form.values]);

  const validateTwo = useCallback((): boolean => {
    if (
      form.values.education === "" ||
      form.values.majors === "" ||
      form.values.subject.length < 6
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
          <div className="mt-2">
            Setup your profile to start teachin and earning today.
          </div>
        </div>

        <div className="mt-10 max-w-[600px] mx-auto px-6 lg:px-8">
          {/* <form> */}
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step disabled>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <ImageDropzone />
                <TextInput
                  ref={inputRefs[0]}
                  required
                  mt={16}
                  size="md"
                  label="Full Name"
                  {...form.getInputProps("fullName")}
                />
                <NumberInput
                  ref={inputRefs[1]}
                  hideControls
                  required
                  mt={16}
                  size="md"
                  label="Age"
                  {...form.getInputProps("age")}
                />

                <Select
                  ref={inputRefs[2]}
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
                  ref={inputRefs[3]}
                  required
                  size="md"
                  label="Education"
                  data={qaulification.map((qaulification) => qaulification)}
                  {...form.getInputProps("education")}
                />

                <Select
                  ref={inputRefs[4]}
                  required
                  mt={16}
                  size="md"
                  label="Your Majors"
                  searchable
                  data={majors.map((major) => major)}
                  {...form.getInputProps("majors")}
                />

                <MultiSelect
                  ref={inputRefs[5]}
                  required
                  mt={16}
                  size="md"
                  label="Subjects you are interested in"
                  data={subjects.map((subject) => subject)}
                  searchable
                  {...form.getInputProps("subject")}
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
                  your profile you will be eligible to start teaching on the
                  platform.
                </div>
                <Button
                  size="md"
                  className="bg-primary w-full mt-10"
                  onClick={() => navigate("/student-login")}
                >
                  Login
                </Button>
              </div>
            </Stepper.Completed>
          </Stepper>
          {/* </form> */}
        </div>
      </div>
    </Fragment>
  );
};

export default StudentProfilSetup;
