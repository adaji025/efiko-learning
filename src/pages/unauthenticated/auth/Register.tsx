import { useState, Fragment } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";

import { FcGoogle } from "react-icons/fc";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../../../services/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      accountType: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Password does not match" : null,
    },
  });

  const submit = (values: any) => {
    setLoading(true);
    userRegistration({ ...values, accountType: userType })
      .then(() => {
        userType === "tutor" && toast.success("Check your email for OTP");
        userType === "student" && toast.success("Registration successful");
        localStorage.setItem("userEmail", values.email);
        userType === "tutor" && navigate("/verify-user");
        userType === "student" && navigate("/student-login");
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
        <img src={Logo} alt="" className="mt-10" />
        <div className="text-center">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <div>Sign up to your account and start learning.</div>
        </div>
        <div className="mt-10 bg-white border shadow px-[40px] sm:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
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
            <form onSubmit={form.onSubmit((values) => submit(values))}>
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
                type="submit"
                className="bg-primary w-full hover:bg-primary/90"
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
                // onClick={() => {
                //   userType === "tutor" && navigate("/tutor-profile-setup");
                //   userType === "student" && navigate("/student-profile-setup");
                // }}
              >
                <FcGoogle /> <div className="ml-2">Sign In with Google</div>
              </Button>
            </form>
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
