import { PinInput, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { studentLogin } from "../../../services/auth";
import { toast } from "react-toastify";
import { Fragment } from "react";
import { setUser } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import useNotification from "../../../hooks/useNotification";

const VerifyCode = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      loginCode: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    studentLogin({ ...values })
      .then((res: any) => {
        toast.success("Account verified successfully");
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("efiko_token", res.data.data.token);
        dispatch(setUser(res.data.data));
        res.data.data.updatedProfile && navigate("/dashboard");
        !res.data.data.updatedProfile && navigate("/student-profile-setup");
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
          <h1 className="font-bold text-2xl">Verify User</h1>
          <div className="mt-3 max-w-[400px]">
            Enter the Login code sent to your Email
          </div>
        </div>
        <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
          <form
            onSubmit={form.onSubmit((values) => submit(values))}
            className="mx-auto flex flex-col items-center"
          >
            <PinInput
              size="md"
              className=""
              {...form.getInputProps("loginCode")}
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

export default VerifyCode;
