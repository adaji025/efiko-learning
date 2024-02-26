import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../../types/auth";
import { RootState } from "../../../../redux/store";

const SessionDetails = () => {
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Book Sessions
      </div>
      <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
        <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold">
          Algebra 101: Complete beginner guide.{" "}
        </div>
        <div className="px-4 lg:px-10 mt-3">
          <div>
            <div className="sm:text-lg font-medium">Subject Category: </div>
            <div className="text-sm ml-2">Mathematics</div>
          </div>
          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Description: </div>
            <div className="text-sm ml-2 max-w-[400px]">
              Algebra, the language of mathematics,To solve problems and explore
              new paths.
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Learning Outcome:</div>
            <ul className="ml-6 list-disc">
              <li>Better understanding of Algebra.</li>
              <li>
                You will know what you can further expect from this domain.
              </li>
              <li>Enables you to appear in SAT.</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-5 justify-between">
            <div>
              <div className="sm:text-lg font-medium">Session Date: </div>
              <div className="text-sm ml-2">3 Oct 2023</div>
            </div>
            <div>
              <div className="sm:text-lg font-medium">Session Time: </div>
              <div className="text-sm ml-2">7:00 PM Eastern Standard Time</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sm:text-lg font-medium">Session Charges:</div>
            <div className="text-sm ml-2">$25</div>
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

export default SessionDetails;
