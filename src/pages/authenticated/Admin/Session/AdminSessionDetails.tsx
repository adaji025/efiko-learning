import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../../types/auth";
import { RootState } from "../../../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AdminSessionType } from "../../../../types/admins/session";
import moment from "moment";
import { convertTo12HourClock } from "../../../../utils";

const AdminSessionDetails = () => {
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );
  const location = useLocation();
  const session: AdminSessionType = location.state;
  const navigate = useNavigate();
  console.log(session)

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Sessions Details
      </div>
      <div
        className="flex gap-2 px-4 items-center mt-10 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <BiArrowBack /> Back
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold">
          {session.title}
        </div>
        <div className="px-4 lg:px-10 mt-3">
          <div>
            <div className="sm:text-lg font-medium">Subject Category: </div>
            <div className="text-sm ml-2">{session.category}</div>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Description: </div>
            <div className="text-sm ml-2 max-w-[400px]">
              {session.description}
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Learning Outcome:</div>
            <ul className="ml-6">
              <li>{session.outcome}</li>
            </ul>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Curriculum:</div>
            <ul className="ml-6">
              <li>{session.curriculumId.title}</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-5 justify-between">
            <div>
              <div className="sm:text-lg font-medium">Session Date: </div>
              <div className="text-sm ml-2">{moment(session.date).format("DD/MM/YYYY") }</div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Time: </div>
              <div className="text-sm ml-2">{ convertTo12HourClock(session.time)}</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Tutor:</div>
            <div className="text-sm ml-2">{session?.tutorId?.fullName }</div>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Type:</div>
            <div className="text-sm ml-2">{session?.free? "Free" : "Paid" }</div>
          </div>
        </div>
      </div>

      {userData?.accountType === "student" && (
        <div className="mt-10 flex justify-center">
          <Button size="md" className=" bg-primary w-1/2 sm:w-1/3 mx-auto">
            Book Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminSessionDetails;
