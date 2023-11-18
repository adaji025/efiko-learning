import { TextInput, Button } from "@mantine/core";
import Logo from "../../../assets/svgs/logo.svg";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
      <img src={Logo} alt="" className="mt-10" />
      <div className="text-center">
        <h1 className="font-bold text-2xl">Forget Password</h1>
        <div className="mt-3 max-w-[400px]">
          You can recover password by simply providing us email you used to
          create account at Efiko Learning
        </div>
      </div>
      <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
        <TextInput
          placeholder="Enter your valid email address"
          required
          size="md"
          label="Email"
          className="w-full"
        />

        <Button size="md" mt={24} className="bg-primary w-full">
          Send Link
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
