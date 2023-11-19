import { useState } from "react";
import { Stepper, Button, TextInput, Select,  MultiSelect } from "@mantine/core";
import Logo from "../../../assets/svgs/logo.svg";
import ImageDropzone from "../../../components/ImageDropzone";
import { countryList } from "../../../utils/country";
import { useNavigate } from "react-router-dom";

const StudentProfilSetup = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
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
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step>
            <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
              <ImageDropzone />
              <TextInput required size="md" label="User Name" />
              <TextInput required mt={16} size="md" label="Full Name" />
              <Select
                required
                mt={16}
                size="md"
                label="Age"
                data={[
                  { label: "one", value: "1" },
                  { label: "tw0", value: "2" },
                  { label: "three", value: "3" },
                ]}
              />

              <Select
                required
                mt={16}
                size="md"
                label="Country"
                data={countryList.map((country) => country)}
                searchable
              />

              <Button
                size="md"
                className="bg-primary w-full mt-10"
                onClick={nextStep}
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
                data={[
                  { label: "one", value: "1" },
                  { label: "tw0", value: "2" },
                  { label: "three", value: "3" },
                ]}
              />

              <Select
                required
                mt={16}
                size="md"
                label="Your Majors"
                data={[
                  { label: "one", value: "1" },
                  { label: "tw0", value: "2" },
                  { label: "three", value: "3" },
                ]}
              />

              <MultiSelect
                required
                mt={16}
                size="md"
                label="Subjects you are interested in"
                data={[
                  { label: "one", value: "1" },
                  { label: "tw0", value: "2" },
                  { label: "three", value: "3" },
                ]}
              />
              <div className="text-xs">Select at least 6 subjects</div>

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
                  onClick={nextStep}
                >
                  Next step
                </Button>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step>
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
                size="md"
                className="bg-primary w-full mt-10"
                onClick={nextStep}
              >
                Confirm
              </Button>
            </div>
          </Stepper.Step>
          <Stepper.Completed>
            <div className="mt-10 bg-white border shadow px-[40px] lg:px-[50px] py-10 rounded-xl max-w-[650px] w-full">
              <div>
                Your profile is under review. As soon as admin will approve your
                profile you will be eligible to start teaching on the platform.
              </div>
              <Button
                size="md"
                className="bg-primary w-full mt-10"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
};

export default StudentProfilSetup;
