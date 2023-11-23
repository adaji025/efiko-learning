import { useSelector } from "react-redux";
import { sessionData } from "../../../components/data";
import { ProfileTypes } from "../../../types/auth";
import Chart from "./components/Chart";
import SessionCard from "./components/SessionCard";
import { RootState } from "../../../redux/store";
import { Menu, Button } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate= useNavigate()
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <div className="px-4 lg:px-10 mt-[80px] lg:mt-10">
      <div className="flex gap-10 ">
        <div className="p-5 border shadow rounded-xl flex-1">
          <div>
            Total Sessions{" "}
            {userData?.accountType === "student" ? "Joined" : "delivered"}
          </div>
          <div className="mt-6 text-4xl">20</div>
        </div>
        <div className="p-5 border shadow rounded-xl flex-1">
          <div>
            Total Amount{" "}
            {userData?.accountType === "student" ? "Spent" : "Earned"}{" "}
          </div>
          <div className="mt-6 text-4xl">$220</div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Trending Sessions</h2>
        <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
          {sessionData.map((item, index) => (
            <SessionCard
              key={index}
              item={item}
              btnText={
                userData.accountType === "student"
                  ? "Book session"
                  : "Update Details"
              }
              handleBtnClick={() => {
                userData.accountType === "student" && navigate("/explore-sessions")
                userData.accountType === "tutor" && navigate("/schedule-sessions")
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-10 border p-5">
        <div className="flex items-center">
          <div className="mb-5 font-semibold mt-5">Statistcs</div>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                rightSection={<BiChevronDown />}
                className="bg-transparent text-black/60 font-bold"
              >
                Year 2023
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>2023</Menu.Item>
              <Menu.Item>2022</Menu.Item>
              <Menu.Item>2021</Menu.Item>
              <Menu.Item>2020</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
