import { useState, Fragment, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";

import { FcGoogle } from "react-icons/fc";
import Logo from "../../../assets/svgs/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { userRegistration } from "../../../services/auth";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";
import { IoLogoApple } from "react-icons/io";

const Register = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

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
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (location && location.state.type === "tutor") {
      setUser("tutor");
    } else if (location && location.state.type === "student") {
      setUser("student");
    } else {
      setUser(null);
    }
  }, [location.state.type]);

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-5 lg:px-8">
        <img src={Logo} alt="" className="mt-10" />
        <div className="text-center">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <div className="mt-1 max-w-[350px] mx-auto">
            Sign up with Efiko Learning and start your connection to your
            heritage
          </div>
        </div>
        <div className="mt-10 bg-white border shadow px-[20px] sm:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
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
              <div className="flex mt-8 flex-col sm:flex-row gap-5">
                <Button
                  size="md"
                  variant="outline"
                  color="gray"
                  className="border w-full flex gap-5 justify-center items-center text-xs text-primary"
                >
                  <FcGoogle size={24} />{" "}
                  <div className="ml-2">Sign In with Google</div>
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  color="gray"
                  className="border w-full flex gap-5 justify-center text-xs items-center text-primary"
                >
                  <IoLogoApple size={24} />{" "}
                  <div className="ml-2">Sign In with Apple ID</div>
                </Button>
              </div>
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
