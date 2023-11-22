import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/svgs/logo.svg";

const StudentLogin = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  return (
    <div className="h-screen flex">
      <div className="sign-in w-1/2 h-full hidden md:block" />
      <div className="flex-1 px-[40px] sm:px-[100px]">
        <div className="flex justify-center mt-16">
          <img src={Logo} alt="efiko learning" />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl text-center mb-5">
            Welcome to Efiko Learning
          </h1>
          <TextInput
            placeholder="Enter your valid email address"
            required
            size="md"
            label="Email"
            className="w-full"
            {...form.getInputProps("email")}
          />
          <Button
            color="gray"
            size="md"
            variant="outline"
            className="w-full mt-5 text-primary font-bold"
          >
            Send Login Code
          </Button>
          <div className="mt-10 flex gap-3 items-center">
            <div className="w-[45%] h-[1px] bg-secondary" />
            <div className="text-secondary font-bold">Or</div>
            <div className="w-[45%] h-[1px] bg-secondary" />
          </div>
          <h2 className="font-semibold text-center my-5">
            Are you a new student?
          </h2>
          <Button size="md" className="bg-primary w-full rounded-full">
            Are you a new student?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
