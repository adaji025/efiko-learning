import { Rating, Select, Textarea, Button } from "@mantine/core";

const ReviewSession = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Review Session
      </div>
      <div className="mt-10 px-4 lg:px-10 max-w-[1000px]">
        <div className="font-semibold text-lg">
          Algebra 101: Complete Beginner Guide
        </div>
        <Rating mt={16} value={4.5} fractions={2} readOnly />
        <Select
          required
          size="md"
          mt={16}
          label="Do you recommend this tutor"
          data={[
            { label: "Yes", value: "1" },
            { label: "No", value: "2" },
          ]}
        />
        <Select
          required
          size="md"
          mt={16}
          label="You learned what was promised in the learning outcome"
          data={[
            { label: "Yes", value: "1" },
            { label: "No", value: "2" },
          ]}
        />
        <Textarea
          required
          mt={16}
          label="Your Reviews"
          autosize
          minRows={6}
          size="sm"
          className=""
        />
        <div className="mt-10 flex justify-center">
          <Button size="md" className=" bg-primary w-1/2 sm:w-1/3 mx-auto">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSession;
