import { useState, Fragment } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";

import { FcGoogle } from "react-icons/fc";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      accountType: "student",
      password: "pass",
      confirmPassword: "pass",
    },
  });
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
        <img src={Logo} alt="" className="mt-10" />
        <div className="text-center">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <div>Sign up to your account and start learning.</div>
        </div>
        <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
          {!userType && (
            <div>
              <div>Select your account type!</div>
              <div className="flex gap-5 mt-5 mx-auto">
                <div
                  className={` w-1/2 border rounded-xl min-h-[155px] flex justify-center items-center font-bold cursor-pointer text-gray-400 ${
                    user === "student" && "bg-primary"
                  }`}
                  onClick={() => setUser("student")}
                >
                  I am a student
                </div>
                <div
                  className={` w-1/2 border rounded-xl min-h-[155px] flex justify-center items-center font-bold cursor-pointer text-gray-400 ${
                    user === "tutor" && "bg-primary"
                  }`}
                  onClick={() => setUser("tutor")}
                >
                  I am a Tutor
                </div>
              </div>
              <Button
                size="md"
                mt={30}
                className="w-full bg-primary"
                onClick={() => setUserType(user)}
              >
                Continue
              </Button>
            </div>
          )}

          {userType && (
            <Fragment>
              <TextInput
                placeholder="Enter your valid email address"
                required
                size="md"
                label="Email"
                className="w-full"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                mt={16}
                size="md"
                label="Password"
                placeholder="Enter your password"
                className="w-full"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                required
                mt={16}
                size="md"
                label="Confirm Password"
                placeholder="Enter your password"
                className="w-full"
                {...form.getInputProps("confirmPassword")}
              />

              <Button
                size="md"
                mt={24}
                className="bg-primary w-full"
                onClick={() => {
                  userType === "tutor" && navigate("/tutor-profile-setup");
                  userType === "student" && navigate("/student-profile-setup");
                }}
              >
                Sign up
              </Button>
              <div className="mt-10 flex gap-3 items-center">
                <div className="w-[45%] h-[1px] bg-secondary" />
                <div className="text-secondary font-bold">Or</div>
                <div className="w-[45%] h-[1px] bg-secondary" />
              </div>
              <Button
                size="md"
                variant="outline"
                color="gray"
                mt={30}
                className="border w-full flex gap-5 justify-center items-center text-primary"
                onClick={() => {
                  userType === "tutor" && navigate("/tutor-profile-setup");
                  userType === "student" && navigate("/student-profile-setup");
                }}
              >
                <FcGoogle /> <div className="ml-2">Sign In with Google</div>
              </Button>
            </Fragment>
          )}
        </div>
        <div className="my-10">
          Don’t have an account?{" "}
          <span
            className="text-primary font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in{" "}
          </span>
          now!
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
