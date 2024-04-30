import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Menu, Button, LoadingOverlay } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import Chart from "./components/Chart";
import { SessionTypes } from "../../../types/session";
import { getTutorSession } from "../../../services/session";
import useNotification from "../../../hooks/useNotification";
import UpcomingSessionCard from "../Sesssion/components/UpcomingSessionCard";
import MoneyChart from "./components/MoneyChart";

const TutorDashboard = () => {
  const d = new Date();
  let currentYear = d.getFullYear();
  const [statistics, setStatistics] = useState("");
  const [Moneystatistics, setMoneyStatistics] = useState("");
  const [year, setYear] = useState(currentYear.toString());
  const [moneyYear, setMoneyYear] = useState(currentYear.toString());
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const userId = localStorage.getItem("userId") ?? "";

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleGetSessions = () => {
    setLoading(true);

    getTutorSession(userId)
      .then((res: any) => {
        setSessions(res.data.data);
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="px-4 lg:px-10 mt-[80px] lg:mt-10">
        <div className="flex gap-10 ">
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>
              Total Sessions{" "}
              {userData?.accountType === "student" ? "Joined" : "delivered"}
            </div>
            <div className="mt-6 text-4xl">0</div>
          </div>
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>
              Total Amount{" "}
              {userData?.accountType === "student" ? "Spent" : "Earned"}{" "}
            </div>
            <div className="mt-6 text-4xl">$0</div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">My Upcoming Sessions</h2>
          <div className="gap-10 mt-5 grid sm:grid-cols-2 xl:grid-cols-3">
            {sessions &&
              sessions.map((item) => (
                <UpcomingSessionCard
                  key={item._id}
                  item={item}
                  btnStartText="Start"
                />
              ))}
          </div>
        </div>

        <div className="text-2xl font-bold mt-10">Session Statistics</div>
        <div className="mt-10 border p-5">
          <div className="flex items-center font-semibold">
            <div className="mb-5 font-semibold mt-5">Statistcs</div>
            <div className="flex gap-5 items-center ml-5">
              <div
                className="text-black/60 text-sm cursor-pointer font-semibold"
                onClick={() => setStatistics("week")}
              >
                This Week
              </div>
              <div
                className="text-black/60 text-sm cursor-pointer font-semibold"
                onClick={() => setStatistics("month")}
              >
                This Month
              </div>
            </div>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightSection={<BiChevronDown />}
                  className="bg-transparent text-black/60 font-bold"
                >
                  Year {year}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setYear("2024");
                    setStatistics("2024");
                  }}
                >
                  2024
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setYear("2023");
                    setStatistics("2023");
                  }}
                >
                  2023
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <Chart statistics={statistics} />
        </div>

        <div className="text-2xl font-bold mt-10">Money Earned Statistics</div>
        <div className="mt-5 border p-5">
          <div className="flex items-center font-semibold">
            <div className="mb-5 font-semibold mt-5">Statistcs</div>
            <div className="flex gap-5 items-center ml-5">
              <div
                className="text-black/60 text-sm cursor-pointer font-semibold"
                onClick={() => setMoneyStatistics("week")}
              >
                This Week
              </div>
              <div
                className="text-black/60 text-sm cursor-pointer font-semibold"
                onClick={() => setMoneyStatistics("month")}
              >
                This Month
              </div>
            </div>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightSection={<BiChevronDown />}
                  className="bg-transparent text-black/60 font-bold"
                >
                  Year {moneyYear}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setMoneyYear("2024");
                    setMoneyStatistics("2024");
                  }}
                >
                  2024
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setMoneyYear("2023");
                    setMoneyStatistics("2023");
                  }}
                >
                  2023
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div className="overflow-hidden">
            <MoneyChart title="Money Earned in USD" statistics={Moneystatistics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TutorDashboard;
