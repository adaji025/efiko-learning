import { TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { sessionData } from "../../../components/data";
import SessionCard from "../Dashboard/components/Session";
import EmptyIcon from "../../../assets/svgs/empty.svg";

const ExploreSession = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Expore Sesion
      </div>
      <div className="px-4 lg:px-10">
        <div className="flex justify-end">
          <TextInput leftSection={<CiSearch />} size="md" mt={10} placeholder="search.." />
        </div>
        {sessionData.length !== 0 && (
          <div className="gap-10 mt-5 grid sm:grid-cols-2 md:grid-cols-3">
            {sessionData.map((item, index) => (
              <SessionCard key={index} item={item} />
            ))}
          </div>
        )}

        {sessionData.length === 0 && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <img src={EmptyIcon} alt="" />
            <div>No such session found!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreSession;
