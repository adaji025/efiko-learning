
import {Avatar} from "@mantine/core"  
import { IoMdTime } from "react-icons/io"
import { MdDateRange } from "react-icons/md"

type IProps = {
    item: {
      name: string;
      tutor: string;
      desc: string;
      duration: number;
    };
  };
      
          
const SessionCard = ({ item }: IProps) => {
  return (
    <div className="pt-5 bg-white shadow-lg rounded-xl my-10 border">
      <div className="px-5">
        <div className="font-semibold">{item.name}</div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Avatar />
          <div>by: {item.tutor}</div>
        </div>
        <div className="mt-2 text-sm">{item.desc}</div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <div>3 Oct 2023</div>
          </div>
          <div className="flex items-center gap-2">
            <IoMdTime />
            <div>{item.duration} hrs</div>
          </div>
        </div>
      </div>
      <button className="bg-[#F5F5F5] text-primary font-bold w-full border rounded-b-xl py-2 mt-2 mb-0">
        Book session
      </button>
    </div>
  
  )
}

export default SessionCard
