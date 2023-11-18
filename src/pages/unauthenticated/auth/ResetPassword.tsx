import { PasswordInput, Button } from "@mantine/core";
import Logo from "../../../assets/svgs/logo.svg";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
      <img src={Logo} alt="" className="mt-10" />
      <div className="text-center">
        <h1 className="font-bold text-2xl">Reset Password</h1>
        <div className="mt-3 max-w-[400px]">
          Set your new password to get ack the access to your Efiko Learning
          account and start learning again.
        </div>
      </div>
      <div className="my-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
        <PasswordInput
          placeholder="Enter your password"
          required
          size="md"
          label="New Password"
          className="w-full"
        />
        <PasswordInput
          placeholder="Enter your password"
          required
          mt={16}
          size="md"
          label="Confirm Password"
          className="w-full"
        />

        <Button size="md" mt={30} className="bg-primary w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
