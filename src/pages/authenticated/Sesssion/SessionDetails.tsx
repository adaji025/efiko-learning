import { Button, LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { SessionTypes } from "../../../types/session";
import moment from "moment";
import { updateSession } from "../../../services/session";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";
import { Fragment, useState } from "react";
import SubscriptionPromp from "./components/SubscriptionPromp";
import { useDisclosure } from "@mantine/hooks";

const SessionDetails = () => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const { handleError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const session: SessionTypes = location.state;

  const bookSession = () => {
    setLoading(true);
    const data = {
      book: true,
    };
    session &&
      updateSession(session._id, data)
        .then(() => {
          toast.success("Session booked successfully");
        })
        .catch((err) => {
          handleError(err);
          err.response.data.message === "User does not have subscription" &&
            open();
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <Fragment>
      <SubscriptionPromp close={close} opened={opened} />
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          <div className="flex items-center gap-2">
            <BiArrowBack onClick={() => navigate(-1)} />
            <div>Book Sesions</div>
          </div>
        </div>
        <div className="md:w-3/4  border mt-10 rounded-xl shadow pb-5 mx-4">
          <div className="w-full border-b px-4 lg:px-10 py-4 font-semibold capitalize">
            {session?.title}
          </div>
          <div className="px-4 lg:px-10 mt-3">
            <div>
              <div className="sm:text-lg font-medium">Subject Category: </div>
              <div className="text-sm ml-2">{session?.category}</div>
            </div>
            <div className="mt-5">
              <div className="sm:text-lg font-medium">
                Session Description:{" "}
              </div>
              <div className="text-sm ml-2 max-w-[400px]">
                {session?.description}
              </div>
            </div>

            <div className="mt-5">
              <div className="sm:text-lg font-medium">Learning Outcome:</div>
              <ul className="ml-6 list-disc">
                <li>{session?.outcome}</li>
                {/* <li>
                You will know what you can further expect from this domain.
              </li>
              <li>Enables you to appear in SAT.</li> */}
              </ul>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-5 justify-between">
              <div>
                <div className="sm:text-lg font-medium">Session Date: </div>
                <div className="text-sm ml-2">
                  {moment(session?.date).format("YYYY-MM-DD")}
                </div>
              </div>
              <div>
                <div className="sm:text-lg font-medium">Session Time: </div>
                <div className="text-sm ml-2">
                  {session?.time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {userData?.accountType === "student" && (
          <div className="mt-10 flex justify-center">
            <Button
              size="md"
              className=" bg-primary w-1/2 sm:w-1/3 mx-auto"
              onClick={bookSession}
            >
              Book Session
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SessionDetails;
