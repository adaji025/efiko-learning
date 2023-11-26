import { useEffect } from "react";
import Line from "../../../assets/svgs/underline.svg";
import { TextInput, Select, Textarea, Button } from "@mantine/core";

const ContactUs = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="px-6 lg:px-8">
      <div className="flex flex-col items-center justify-end min-h-[40vh] sm:min-h-[50vh]">
        <h2 className="font-bold text-4xl">Help & Support</h2>
        <img src={Line} alt="line" />
        <div className="mt-5">
          Didn’t find your answer in FAQs? Don’t worry! write to us and we will
          get back to you with answer.
        </div>
      </div>
      <div className="mt-20 max-w-[800px] mx-auto">
        <TextInput size="md" placeholder="Enter your email" />
        <Select
          size="md"
          mt={16}
          placeholder="Issue Category"
          data={[
            { label: "Issues Category one", value: "category one" },
            { label: "Issues Category two", value: "category two" },
          ]}
        />
        <TextInput size="md" mt={16} placeholder="Subject" />
        <Textarea
          size="xl"
          mt={16}
          placeholder="Write us about the issue"
          className="bg-transparent"
        />

        <div className="w-1/2 mx-auto mt-10">
          <Button className="bg-primary w-full">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
