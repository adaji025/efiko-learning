import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/SessionCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";

const RedcordedSession = () => {
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const navigate = useNavigate();
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Recorded Sesion
      </div>
      <div className="px-4 lg:px-10">
        <div className="flex justify-end">
          <TextInput
            leftSection={<CiSearch />}
            size="md"
            mt={10}
            placeholder="search.."
          />
        </div>
        {sessionData.length !== 0 && (
          <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
            {sessionData.map((item, index) => (
              <SessionCard
                btnText={
                  userData?.accountType === "student"
                    ? "Review Session"
                    : "View Recorded Session"
                }
                handleBtnClick={() => {
                  userData?.accountType === "student" &&
                    navigate("/recorded-sessions/63ednecdsth");
                  userData?.accountType === "tutor" &&
                    navigate("/recorded-sessions-details/63ednecdsth");
                }}
                key={index}
                item={item}
              />
            ))}
          </div>
        )}

        {sessionData.length === 0 && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No recorded session available.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedcordedSession;
