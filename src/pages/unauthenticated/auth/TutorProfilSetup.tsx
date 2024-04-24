import { useState, Fragment, useCallback } from "react";
import {
  Stepper,
  Button,
  TextInput,
  Select,
  Textarea,
  NumberInput,
  FileInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import ImageDropzone from "../../../components/ImageDropzone";
import { countryList } from "../../../utils/country";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import { qaulification, subjects } from "../../../components/data";
import { profileSetUp } from "../../../services/user";
import { toast } from "react-toastify";

const TutorProfilSetup = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  // const [edDocvalue, setEdDocValue] = useState<File[]>([]);
  const [edDocvalue, setEdDocValue] = useState<File | null>(null);
  const [natIdvalue, setNatIdValue] = useState<File | null>(null);

  const { handleError } = useNotification();
  const id = localStorage.getItem("userId") ?? "";
  const navigate = useNavigate();

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      fullName: "",
      age: "",
      country: "",
      description: "",
      education: "",
      teachingExperience: "",
      subject: "",
    },
    validate: {
      fullName: (value) => (value === "" ? "Input full name" : null),
      country: (value) => (value === "" ? "Input Country" : null),
      age: (value) => (value === "" ? "Input age" : null),
      education: (value) => (value === "" ? "Input Education" : null),
      teachingExperience: (value) => (value === "" ? "Input Majors" : null),
    },
  });

  const validate = useCallback((): boolean => {
    if (
      form.values.fullName === "" ||
      form.values.age === "" ||
      form.values.country === "" ||
      files.length === 0
    )
      return true;
    return false;
  }, [form.values, files]);

  const validateTwo = useCallback((): boolean => {
    if (
      form.values.education === "" ||
      form.values.teachingExperience === "" ||
      form.values.subject === "" ||
      // edDocvalue.length === 0 ||
      edDocvalue === null ||
      natIdvalue === null
    )
      return true;
    return false;
  }, [form.values, edDocvalue, natIdvalue]);

  const validateThree = useCallback((): boolean => {
    if (form.values.description === "") return true;
    return false;
  }, [form]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular key-value pairs
    formData.append("image", files[0]);
    if (edDocvalue) formData.append("educationDoc", edDocvalue);
    if (natIdvalue) formData.append("nationalId", natIdvalue);
    formData.append("fullName", form.values.fullName);
    formData.append("age", form.values.age);
    formData.append("country", form.values.country);
    // formData.append("teachingExperience", form.values.teachingExperience);
    formData.append("description", form.values.description);
    // formData.append("subject", form.values.subject);
    // formData.append("education", form.values.education);

    // Append nested object key-value pairs
    formData.append("tutorEducationDetails.education", form.values.education);
    formData.append(
      "tutorEducationDetails.teachingExperience",
      form.values.teachingExperience
    );
    formData.append("tutorEducationDetails.subject", form.values.subject);

    // Append array elements
    // edDocvalue.forEach((img, index) => {
    //   educationFormData.append(`educationImage[${index}]`, img);
    // });

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

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="pb-10 bg-gray-50">
        <div className="border-b">
          <img src={Logo} alt="" className="h-[100px]" />
        </div>
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold text-primary">Tutor Profile</h2>
          <div className="mt-2">
            Setup your profile to start teachin and earning today.
          </div>
        </div>

        <div className="mt-10 max-w-[600px] mx-auto px-6 lg:px-8">
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <ImageDropzone files={files} setFiles={setFiles} />

                <TextInput
                  required
                  mt={16}
                  size="md"
                  label="Full Name"
                  {...form.getInputProps("fullName")}
                />
                <NumberInput
                  hideControls
                  required
                  mt={16}
                  size="md"
                  label="Age"
                  {...form.getInputProps("age")}
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
            <Stepper.Step>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <Select
                  required
                  size="md"
                  label="Education"
                  data={qaulification.map((qaulification) => qaulification)}
                  {...form.getInputProps("education")}
                />

                <NumberInput
                  hideControls
                  required
                  mt={16}
                  size="md"
                  label="Teaching Experience"
                  {...form.getInputProps("teachingExperience")}
                />

                <Select
                  required
                  mt={16}
                  size="md"
                  label="What subject you want to teach?"
                  data={subjects.map((subject) => subject)}
                  searchable
                  {...form.getInputProps("subject")}
                />

                <FileInput
                  // multiple
                  required
                  size="md"
                  mt={16}
                  value={edDocvalue}
                  onChange={setEdDocValue}
                  label="Upload your highest educational document"
                />
                <FileInput
                  required
                  size="md"
                  mt={16}
                  value={natIdvalue}
                  onChange={setNatIdValue}
                  label="Upload your national identity card"
                />

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
            <Stepper.Step>
              <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
                <Textarea
                  label="Profile Description"
                  placeholder="Enter your valid email address"
                  autosize
                  minRows={6}
                  size="sm"
                  className=""
                  {...form.getInputProps("description")}
                />
                <div className="mt-6 text-xs">
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
                  size="md"
                  type="submit"
                  disabled={validateThree()}
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

export default TutorProfilSetup;
