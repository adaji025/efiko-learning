import { Button, Divider, Radio, Group } from "@mantine/core";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Logo from "../../../assets/svgs/logo.svg";

import "react-phone-input-2/lib/style.css";

const BookClass = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="min-h-screen flex">
      <div className="sign-in w-1/2 min-h-screen hidden md:flex" />
      <div className="flex-1 px-[40px] sm:px-[100px]">
        <div className="flex justify-center">
          <img src={Logo} alt="efiko learning" />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl text-center mb-5">
            Welcome to Efiko Learning
          </h1>
          <div className="mb-5 w-full">
            <PhoneInput
              country={"eg"}
              enableSearch={true}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{ width: "100%" }}
            />
          </div>
          <div className="mt-10 font-semibold">Select your child’s grade</div>
          <div className="mt-5 gap-3 grid grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <div
                className="p-2 text-sm rounded-2xl border text-center"
                key={i}
              >
                <div className="font-semibold">Grade</div>
                {i + 1}
              </div>
            ))}
          </div>
          <Divider my={16} />
          <div className="font-semibold">Do you have a laptop?</div>
          <Radio.Group withAsterisk>
            <Group mt="xs">
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Group>
          </Radio.Group>
          <Button size="md" className="bg-primary w-full my-5">
            Schedule a class for free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookClass;
