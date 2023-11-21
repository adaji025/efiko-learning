import { useState, Fragment } from "react";
import { useForm } from "@mantine/form";
import { PasswordInput, PinInput, Button, LoadingOverlay } from "@mantine/core";
import useNotification from "../../../hooks/useNotification";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { handleError } = useNotification();

  const email = localStorage.getItem("userEmail");

  const form = useForm({
    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Password does not match" : null,
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    resetPassword({ ...values, email })
      .then(() => {
        toast.success("Password reset successful");
        navigate("/login");
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
        <img src={Logo} alt="" className="mt-10" />
        <div className="text-center">
          <h1 className="font-bold text-2xl">Reset Password</h1>
          <div className="mt-3 max-w-[400px]">
            Set your new password to get ack the access to your Efiko Learning
            account and start learning again.
          </div>
        </div>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          className="my-10 bg-white border shadow px-[40px] sm:px-[100px] py-10 rounded-xl max-w-[650px] w-full"
        >
          <PinInput size="md" className="" {...form.getInputProps("otp")} />
          <PasswordInput
            placeholder="Enter your password"
            required
            mt={16}
            size="md"
            label="New Password"
            className="w-full"
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            placeholder="Enter your password"
            required
            mt={16}
            size="md"
            label="Confirm Password"
            className="w-full"
            {...form.getInputProps("confirmPassword")}
          />

          <Button type="submit" size="md" mt={30} className="bg-primary w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
