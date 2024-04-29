import { Fragment, useState } from "react";
// import { useSelector } from "react-redux";
import { Menu, Button } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
// import { ProfileTypes } from "../../../../types/auth";
// import { RootState } from "../../../../redux/store";
import Chart from "./components/Chart";
// import { getTutorSession } from "../../../../services/session";
// import useNotification from "../../../../hooks/useNotification";

const AdminDashboard = () => {
  const d = new Date();
  let currentYear = d.getFullYear();
  // const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState("");
  const [year, setYear] = useState(currentYear.toString());

  // const { handleError } = useNotification();
  // const userData: ProfileTypes = useSelector(
  //   (state: RootState) => state.user.userData
  // );

  // const userId = localStorage.getItem("userId") ?? "";

  return (
    <Fragment>
      {/* <LoadingOverlay visible={loading} /> */}
      <div className="px-4 lg:px-10 mt-[80px] lg:mt-10 overflow-hidden">
        <div className="flex gap-10 ">
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>Total Students</div>
            <div className="mt-6 text-4xl">20</div>
          </div>
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>Total Tutors</div>
            <div className="mt-6 text-4xl">$220</div>
          </div>
        </div>
        <div className="mt-10">
          {/* <h2 className="text-xl font-semibold">My Upcoming Sessions</h2> */}
        </div>
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
                <Menu.Item onClick={() => setYear("2024")}>2024</Menu.Item>
                <Menu.Item>2023</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div className="overflow-hidden">
            <Chart statistics={statistics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
