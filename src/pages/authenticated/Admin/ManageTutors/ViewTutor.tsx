import { Fragment } from "react";
import { Avatar, Button } from "@mantine/core";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoSchoolSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { TutorTypes } from "../../../../types/admins/tutor";

export const VerifiedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="25"
      viewBox="0 0 17 25"
      fill="none"
    >
      <path
        d="M8.5 16.5C6.91775 16.5 5.37103 16.0308 4.05544 15.1517C2.73985 14.2727 1.71447 13.0233 1.10897 11.5615C0.503466 10.0997 0.34504 8.49112 0.653721 6.93927C0.962403 5.38743 1.72433 3.96197 2.84315 2.84315C3.96197 1.72433 5.38743 0.962403 6.93928 0.653721C8.49113 0.34504 10.0997 0.503466 11.5615 1.10897C13.0233 1.71447 14.2727 2.73985 15.1518 4.05544C16.0308 5.37103 16.5 6.91775 16.5 8.49999C16.4976 10.621 15.654 12.6544 14.1542 14.1542C12.6545 15.654 10.621 16.4976 8.5 16.5ZM8.5 18.5C6.33339 18.499 4.22645 17.79 2.5 16.481V22C2.5 22.4709 2.63301 22.9323 2.88374 23.331C3.13446 23.7296 3.49269 24.0494 3.91717 24.2533C4.34164 24.4573 4.81511 24.5373 5.28303 24.4839C5.75095 24.4306 6.19429 24.2462 6.562 23.952L8.188 22.652C8.2766 22.5812 8.38662 22.5427 8.5 22.5427C8.61339 22.5427 8.7234 22.5812 8.812 22.652L10.438 23.952C10.8057 24.2462 11.2491 24.4306 11.717 24.4839C12.1849 24.5373 12.6584 24.4573 13.0828 24.2533C13.5073 24.0494 13.8656 23.7296 14.1163 23.331C14.367 22.9323 14.5 22.4709 14.5 22V16.481C12.7735 17.7899 10.6666 18.4989 8.5 18.5Z"
        fill="#1B086A"
      />
    </svg>
  );
};

const ViewTutor = () => {
  const location = useLocation();
  const tutor: TutorTypes = location.state;
  console.log(tutor);
  return (
    <Fragment>
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          My Profile
        </div>
        <div className="mt-10 px-4 lg:px-8">
          <div className="border rounded-2xl flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r p-5">
              <Avatar size="xl" className="mt-5" />
              <div className="font-semibold mt-5 capitalize">
                {tutor?.firstName} {tutor?.lastName}
                {tutor?.fullName}
              </div>
              <div className="text-sm mt-2 capitalize">tutor</div>
              <div className="text-sm mt-2">{tutor?.email}</div>

              <Button
                size="md"
                className="bg-secondary text-primary font-bold mt-5"
                leftSection={<VerifiedIcon />}
              >
                {tutor?.approvalStatus} Account
              </Button>
            </div>
            <div className="flex-1">
              <div className="p-5 border-b">
                <div className="font-semibold mt-5 text-lg text-primary">
                  Profile Description
                </div>
                <div>bio</div>
              </div>
              <div className={`p-5 `}>
                <div className="font-semibold mt-5 text-lg text-primary">
                  Personal Details
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Name:</span> {tutor?.firstName}{" "}
                  {tutor?.lastName}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Age:</span> {tutor?.age}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Experience:</span> 3 Years
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Country:</span> {tutor?.country}
                </div>
              </div>
              <div className="p-5 border-b">
                <div className="font-semibold mt-5 text-lg text-primary">
                  Educational Details
                </div>
                <div className="mt-2 text-sm">Education: Bachelors </div>
                <div className="mt-2 text-sm">
                  Your Majors: Computer Science
                </div>
                <div className="mt-2 text-sm">
                  Subjects you are interested in:{" "}
                </div>
                <div className="mt-2 flex flex-wrap gap-5 ">
                  {tutor?.subjectInterest.map((item, i) => (
                    <div key={i} className="bg-secondary p-2 rounded-md">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 p-5">
                <Button
                  size="md"
                  leftSection={<HiMiniIdentification />}
                  className="bg-secondary text-primary font-bold mt-5"
                >
                  View Natianal ID Card
                </Button>
                <Button
                  size="md"
                  leftSection={<IoSchoolSharp />}
                  className="bg-secondary text-primary font-bold mt-5"
                >
                  Educational Document
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewTutor;
