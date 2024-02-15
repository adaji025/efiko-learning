import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Menu, Button, LoadingOverlay } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import Chart from "./components/Chart";
import SessionCard from "./components/SessionCard";
import { SessionTypes } from "../../../types/session";
import { getSession } from "../../../services/session";
import useNotification from "../../../hooks/useNotification";

const Dashboard = () => {
  const [sessions, setSessions] = useState<SessionTypes[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleGetSessions = () => {
    setLoading(true);

    getSession()
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
          <div className="gap-10 mt-5 grid sm:grid-cols-2 xl:grid-cols-3">
            {sessions &&
              sessions.map((session) => (
                <SessionCard
                  btnText="Book session"
                  handleBtnClick={() =>
                    navigate(`/explore-sessions/${session._id}`, {
                      state: session,
                    })
                  }
                  key={session._id}
                  item={session}
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
    </Fragment>
  );
};

export default Dashboard;
