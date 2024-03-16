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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Amount Spent",
        data: [5, 10, 20, 6, 10, 20, 9, 10, 9, 8, 11, 12],
        backgroundColor: "#00F5C0",
      },
      {
        label: "Joined Sessions",
        data: [1, 10, 20, 15, 10, 8, 12, 12, 11, 9, 8, 5],
        backgroundColor: "#FE66C4",
      },
    ],
  };

  return (
    <div className="overflow-hidden">
      <Box mt={50} className="overflow-hidden">
        <Bar options={options} data={data} />
      </Box>
    </div>
  );
};

export default Chart;
