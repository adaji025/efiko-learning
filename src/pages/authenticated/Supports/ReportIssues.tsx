import { TextInput, Select, Textarea, Button } from "@mantine/core";

const ReportIssues = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Report Issue
      </div>
      <div className="mt-10 max-w-[1000px] mx-auto px-6 lg:px-8">
        <TextInput size="md" mt={16} placeholder="Enter your email" />
        <Select
          required
          size="md"
          mt={16}
          placeholder="Choose Issue Category"
          data={[
            { label: "one", value: "1" },
            { label: "tw0", value: "2" },
            { label: "three", value: "3" },
          ]}
        />
        <Select
          required
          size="md"
          mt={16}
          placeholder="Choose Subject  "
          data={[
            { label: "one", value: "1" },
            { label: "tw0", value: "2" },
            { label: "three", value: "3" },
          ]}
        />
        <Textarea
          mt={16}
          placeholder="Let us know about your issue."
          autosize
          minRows={6}
          size="sm"
          className=""
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          size="md"
          mt={42}
          className="bg-primary w-1/2 mx-auto"
        >
          Submit Issue
        </Button>
      </div>
    </div>
  );
};

export default ReportIssues;
