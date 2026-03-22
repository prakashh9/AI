import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts({ data }) {

  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Attack Types",
        data: data?.datasets?.[0]?.data || [],
        backgroundColor: ["red", "orange", "yellow", "green", "cyan"]
      }
    ]
  };

  return <Bar data={chartData} />;
}