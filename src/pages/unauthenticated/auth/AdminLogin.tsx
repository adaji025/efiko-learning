import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { Fragment, useState } from "react";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../../../services/auth";
import useNotification from "../../../hooks/useNotification";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    adminlogin(values)
      .then((res: any) => {
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("efiko_token", res.data.data.token);
        dispatch(setUser(res.data.data));
        navigate("/dashboard");
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10 px-6 lg:px-8">
        <img src={Logo} alt="" className="mt-6" />
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
          <div
            className="text-right text-primary hover:underline font-semibold cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
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
        </form>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
