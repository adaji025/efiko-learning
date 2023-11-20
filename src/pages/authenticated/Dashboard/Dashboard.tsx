import Chart from "./components/Chart";
import SessionCard from "./components/Session";

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
        <div className="mt-5 gap-10 grid sm:grid-cols-2 md:grid-cols-3">
          {sessionData.map((item, index) => (
            <SessionCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
