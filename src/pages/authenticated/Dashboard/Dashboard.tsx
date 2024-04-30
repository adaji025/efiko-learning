import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Button } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import Chart from "./components/Chart";
import MoneyChart from "./components/MoneyChart";

const Dashboard = () => {
  const d = new Date();
  let currentYear = d.getFullYear();
  const [statistics, setStatistics] = useState("");
  const [Moneystatistics, setMoneyStatistics] = useState("");
  const [year, setYear] = useState(currentYear.toString());
  const [moneyYear, setMoneyYear] = useState(currentYear.toString());
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <Fragment>
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
            <MoneyChart title="Money Spent in Local Currency" statistics={Moneystatistics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
