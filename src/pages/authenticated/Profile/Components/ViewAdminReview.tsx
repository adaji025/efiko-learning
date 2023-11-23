import { Rating } from "@mantine/core";

const Card = () => {
  return (
    <div className="p-5 border rounded-xl">
      <Rating value={3.5} fractions={2} readOnly />
      <div className="mt-2">
        Tutor has done the amazing job. His teaching style is great. Learned a
        lot. Not only I recommend him but whould like to join future sessions as
        well.
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-2 font-medium">Adam Palm - Student</div>
        <div className="text-sm">Sept 17, 2023</div>
      </div>
    </div>
  );
};

const ViewAdminReview = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Reviews
      </div>
      <div className="mt-10 px-4 lg:px-10">
        <div className="font-semibold mt-5 text-lg">
          Algebra 101: Complete Beginner Guide
        </div>
        <div className="mt-4">200 students attended the session.</div>
        <div className="mt-1">200 students added reviews.</div>
        <div className="mt-10 grid gap-5">
          {[...Array(2)].map((_, i) => (
            <Card key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAdminReview;
