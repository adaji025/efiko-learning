import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/SessionCard";

const RedcordedSession = () => {
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
                btnText="BView Recorded Session"
                handleBtnClick={() => {}}
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
