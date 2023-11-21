import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { Fragment, useState } from "react";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { userlogin } from "../../../services/auth";
import useNotification from "../../../hooks/useNotification";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {handleError} = useNotification()

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    userlogin(values)
      .then((res: any) => {
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("efiko_token", res.data.data.token);
        navigate("/dashboard")
        window.location.reload();
      })
      .catch((err: any) => {
        handleError(err);
        console.log(err)
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
          <h1 className="font-bold text-2xl">Sign In</h1>
          <div>Sign in to your account and start learning.</div>
        </div>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          className="mt-10 bg-white border shadow px-[40px] sm:px-[100px] py-10 rounded-xl max-w-[650px] w-full"
        >
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
          <div className="text-right text-primary hover:underline font-semibold cursor-pointer"
          onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </div>
          <Button type="submit" size="md" mt={24} className="bg-primary w-full">
            Sign in
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
          >
            <FcGoogle /> <div className="ml-2">Sign In with Google</div>
          </Button>
        </form>
        <div className="my-10">
          Don’t have an account?{" "}
          <span
            className="text-primary font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Create an account{" "}
          </span>
          now!
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
