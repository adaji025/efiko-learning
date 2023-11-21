import { useState, Fragment } from "react";
import { TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/auth";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    forgotPassword(values)
      .then(() => {
        toast.success("OTP has been sent to Your Email");
        localStorage.setItem("userEmail", values.email);
        navigate("/reset-password")
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
          <h1 className="font-bold text-2xl">Forget Password</h1>
          <div className="mt-3 max-w-[400px]">
            You can recover password by simply providing us email you used to
            create account at Efiko Learning
          </div>
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

          <Button
            type="submit"
            size="md"
            mt={30}
            className="bg-primary w-full"
          >
            Send OTP
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
