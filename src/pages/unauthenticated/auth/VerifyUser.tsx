import { PinInput, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { userVerification } from "../../../services/auth";
import { toast } from "react-toastify";
import { Fragment } from "react";

const VerifyUser = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail") ?? "";

  const form = useForm({
    initialValues: {
      otp: "",
      email: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    userVerification({ ...values, email })
      .then(() => {
        toast.success("Account verified successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
        <img src={Logo} alt="" className="mt-10" />
        <div className="text-center">
          <h1 className="font-bold text-2xl">Verify User</h1>
          <div className="mt-3 max-w-[400px]">
            Enter the OTP sent to your Email
          </div>
        </div>
        <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
          <form
            onSubmit={form.onSubmit((values) => submit(values))}
            className="mx-auto flex flex-col items-center"
          >
            <PinInput
              ref={inputRef}
              size="md"
              className=""
              {...form.getInputProps("otp")}
            />

            <Button
              type="submit"
              size="md"
              mt={30}
              className="bg-primary w-full"
            >
              Verify
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyUser;
