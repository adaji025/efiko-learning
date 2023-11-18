import { TextInput, PasswordInput, Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../../assets/svgs/logo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-8">
      <img src={Logo} alt="" className="mt-10" />
      <div className="text-center">
        <h1 className="font-bold text-2xl">Sign In</h1>
        <div>Sign in to your account and start learning.</div>
      </div>
      <div className="mt-10 bg-white border shadow px-[40px] lg:px-[100px] py-10 rounded-xl max-w-[650px] w-full">
        <TextInput
          placeholder="Enter your valid email address"
          required
          size="md"
          label="Email"
          className="w-full"
        />
        <PasswordInput
          required
          mt={16}
          size="md"
          label="Password"
          placeholder="Enter your password"
          className="w-full"
        />
        <div className="text-right text-primary hover:underline font-semibold cursor-pointer">
          Forgot password?
        </div>
        <Button size="md" mt={24} className="bg-primary w-full">
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
      </div>
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
  );
};

export default Login;
