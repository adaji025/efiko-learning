import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { SessionTypes } from "../../../../types/session";
import moment from "moment";
import { convertMinutesToHours } from "../../../../utils";

type IProps = {
  item: SessionTypes;
  btnText: string;
  handleBtnClick: () => void;
};

const SessionCard = ({ item, btnText, handleBtnClick }: IProps) => {
  return (
    <div className="pt-5 bg-white shadow-lg rounded-xl mb-10 border">
      <div className="px-5">
        <div className="font-semibold capitalize">{item?.title}</div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Avatar />
          <div>by: {item?.tutorId?.fullName}</div>
        </div>
        <div className="mt-2 text-sm">{item.description}</div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <div className="text-sm">
              {moment(item?.date).format("DD MMM, YYYY")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoMdTime />
            <div>{convertMinutesToHours(Number(item.duration))}</div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#F5F5F5] text-primary font-bold w-full border-t rounded-b-xl py-2 mt-2 mb-0"
        onClick={handleBtnClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default SessionCard;
