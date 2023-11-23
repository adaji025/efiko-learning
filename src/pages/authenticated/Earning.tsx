import { Button, Menu } from "@mantine/core";
import { BiChevronDown } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

const EarningCard = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center border rounded-xl p-5">
      <div>
        <div className="font-semibold text-lg">
          Algebra 101: Complete beginner guide.{" "}
        </div>
        <div className="mt-2">200 students attended the session.</div>
        <div className="flex items-center gap-2 mt-2">
          <CiCalendar />
          <div>3 Oct 2023</div>
        </div>
      </div>
      <div>
        <div className="mt-6 text-xl sm:text-4xl text-primary">$220</div>
        <div>Earning from session</div>
      </div>
    </div>
  );
};

const Earning = () => {
  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Earning
      </div>
      <div className="px-4 lg:px-10 mt-10">
        <div className="flex flex-col sm:flex-row gap-10 ">
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>Total Amount Earned</div>
            <div className="mt-6 text-4xl">$20</div>
          </div>
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>Total Earnings After Commission</div>
            <div className="mt-6 text-4xl">$220</div>
          </div>
          <div className="p-5 border shadow rounded-xl flex-1">
            <div>Pending</div>
            <div className="mt-6 text-4xl">$220</div>
          </div>
        </div>

        <div className="mt-10 p-5 border shadow rounded-xl flex flex-col sm:flex-row gap-10 justify-between sm:items-center">
          <div>
            <div>Your payment is pending</div>
            <div className="mt-6 text-4xl">$220</div>
          </div>
          <Button size="md" className=" bg-primary ">
            Request Payment
          </Button>
        </div>

        <div className="mt-10 grid gap-5">
          <div className="flex justify-between items-center">
            <div className="font-mdeium text-xl text-primary">
              Earning Breakdown
            </div>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightSection={<BiChevronDown />}
                  className="bg-transparent text-black/60 font-bold"
                >
                  Year 2023
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>2023</Menu.Item>
                <Menu.Item>2022</Menu.Item>
                <Menu.Item>2021</Menu.Item>
                <Menu.Item>2020</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          {[...Array(4)].map((_, i) => (
            <EarningCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earning;
