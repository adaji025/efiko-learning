import { Avatar } from "@mantine/core";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { SessionTypes } from "../../../../types/session";
import moment from "moment";
import { CopyButton } from "@mantine/core";
import { FaRegCopy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type IProps = {
  item: SessionTypes;
  btnStartText: string;
};

const UpcomingSessionCard = ({ item }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="pt-5 flex flex-col justify-between bg-white shadow-lg rounded-xl mb-10 border">
      <div className="px-5">
        <div className="font-semibold">{item?.title}</div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Avatar />
          <div>by: {item?.tutorId.fullName}</div>
        </div>
        <div className="mt-2 text-sm">{item?.description}</div>
        <div className="my-5 text-sm">
          <CopyButton value={item.passCode}>
            {({ copied, copy }) => (
              <button
                className="text-primary flex gap-2 items-center"
                color={copied ? "teal" : "blue"}
                onClick={copy}
              >
                {copied ? item.passCode : "Meeting Pass code"} <FaRegCopy />
              </button>
            )}
          </CopyButton>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <div className="text-sm">
              {moment(item?.date).format("DD MMM, YYYY")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoMdTime />
            <div>{item.time} WAT</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="bg-[#F5F5F5] text-primary font-bold w-full border-t rounded-b-xl py-2 mt-2 mb-0"
          onClick={() =>
            navigate(`/upcoming-sessions/${item._id}`, { state: item })
          }
        >
          view Session
        </button>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;
