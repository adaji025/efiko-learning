import { LiaTimesSolid } from "react-icons/lia";
const Notification = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Notification
      </div>
      <div className="mt-10 grid gap-5 max-w-[800px] mx-auto">
        {[...Array(5)].map((_, i) => (
          <div className="border-b flex justify-between p-4" key={i}>
            <div>Your session will start in 20mins.</div>
            <LiaTimesSolid />
          </div>
        )) }
      </div>
    </div>
  );
};

export default Notification;
