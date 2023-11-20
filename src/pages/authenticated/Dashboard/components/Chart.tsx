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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
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
        data: [5, 10, 20, 6, 10, 20, 9],
        backgroundColor: "#00F5C0",
      },
      {
        label: "Joined Sessions",
        data: [1, 10, 20, 15, 10, 8, 12],
        backgroundColor: "#FE66C4",
      },
    ],
  };

  return (
    <Box mt={50}>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default Chart;
