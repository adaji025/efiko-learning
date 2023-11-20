import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

const sessionData = [
  {
    name: "Algebra 101: Complete beginner guide. ",
    tutor: "Peter Drury",
    desc: `Algebra, the language of mathematics,To solve problems and explore new paths.`,
    duration: 3,
  },
  {
    name: "Algebra 101: Complete beginner guide. ",
    tutor: "Peter Drury",
    desc: `Algebra, the language of mathematics,To solve problems and explore new paths.`,
    duration: 3,
  },
  {
    name: "Algebra 101: Complete beginner guide. ",
    tutor: "Peter Drury",
    desc: `Algebra, the language of mathematics,To solve problems and explore new paths.`,
    duration: 3,
  },
  {
    name: "Algebra 101: Complete beginner guide. ",
    tutor: "Peter Drury",
    desc: `Algebra, the language of mathematics,To solve problems and explore new paths.`,
    duration: 3,
  },
];

type IProps = {
  item: {
    name: string;
    tutor: string;
    desc: string;
    duration: number;
  };
};

const Card = ({ item }: IProps) => {
  return (
    <div className="pt-5 bg-white ml-10 shadow-lg rounded-xl my-10 border">
      <div className="px-5">
        <div className="font-semibold">{item.name}</div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Avatar />
          <div>by: {item.tutor}</div>
        </div>
        <div className="mt-2 text-sm">{item.desc}</div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <div>3 Oct 2023</div>
          </div>
          <div className="flex items-center gap-2">
            <IoMdTime />
            <div>{item.duration} hrs</div>
          </div>
        </div>
      </div>
      <button className="bg-[#F5F5F5] text-primary font-bold w-full border rounded-b-xl py-2 mt-2 mb-0">
        Book session
      </button>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="mt-10">
      <div className="flex gap-10 ">
        <div className="p-5 border shadow rounded-xl flex-1">
          <div>Total Sessions Joined</div>
          <div className="mt-6 text-4xl">20</div>
        </div>
        <div className="p-5 border shadow rounded-xl flex-1">
          <div>Total Sessions Joined</div>
          <div className="mt-6 text-4xl">20</div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Trending Sessions</h2>
        <div className="mt-5 grid grid-cols-3">
          {sessionData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
