import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { SessionTypes } from "../../../../types/session";
import moment from "moment";

type IProps = {
  item: SessionTypes;
  btnEditText: string;
  btnStartText: string;
  handleEditClick: () => void;
  handleStartClick: () => void;
};

const UpcomingSessionCard = ({ item, btnEditText, btnStartText, handleEditClick, handleStartClick }: IProps) => {
  return (
    <div className="pt-5 bg-white shadow-lg rounded-xl mb-10 border">
      <div className="px-5">
        <div className="font-semibold">{item?.title}</div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Avatar />
          <div>by: {item?.tutorId.fullName}</div>
        </div>
        <div className="mt-2 text-sm">{item?.description}</div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <div className="text-sm">{moment(item?.date).format("DD MMM, YYYY")}</div>
          </div>
          <div className="flex items-center gap-2">
            <IoMdTime />
            <div>3 hrs</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="bg-[#F5F5F5] text-primary font-bold w-full border-t rounded-b-xl py-2 mt-2 mb-0 border-r"
          onClick={handleEditClick}
        >
          {btnEditText}
        </button>
        <button
          className="bg-[#F5F5F5] text-primary font-bold w-full border-t rounded-b-xl py-2 mt-2 mb-0"
          onClick={handleStartClick}
        >
          {btnStartText}
        </button>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;
