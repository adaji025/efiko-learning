import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mantine/core";

type IProps = {
  statistics: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoneyChart = ({ statistics }: IProps) => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];

  const week = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels:
      statistics === "week" ? week : statistics === "month" ? month : labels,
    datasets: [
      {
        label: "Money Earn in USD",
        data: [5, 10, 20, 6, 10, 20, 9, 10, 9, 8, 11, 12],
        backgroundColor: "#00F5C0",
      },
    ],
  };

  return (
    <div className="overflow-hidden">
      <Box mt={50} className="overflow-hidden">
        <Bar options={options} data={data}  />
      </Box>
    </div>
  );
};

export default MoneyChart;
