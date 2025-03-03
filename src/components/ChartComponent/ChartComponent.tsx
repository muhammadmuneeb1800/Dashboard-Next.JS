"use client";

import {
  ChartComponentProps,
  PieChartDataPoint,
  RawDataPoint,
} from "@/types/types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export const ChartComponent = ({
  type,
  data,
  color = "#2F80ED",
}: ChartComponentProps) => {
  if (type === "line") {
    const lineData = data as RawDataPoint[];
    const chartData = {
      labels: lineData.map((_, index) => index + 1),
      datasets: [
        {
          label: "Online Status",
          data: lineData.map((d) => (d.isOnline ? 1 : 0)),
          borderColor: color || "#007bff",
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          tension: 0.9,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    };

    return <Line data={chartData} options={options} />;
  }

  if (type === "pie") {
   const isPieChart = (data as PieChartDataPoint[])[0]?.value !== undefined;
    const hasData =
      Array.isArray(data) &&
      isPieChart &&
      data.length > 0 &&
      data.every((d) => (d as PieChartDataPoint).value !== undefined);

    const chartData = {
      labels: ["Female", "Male"],
      datasets: hasData
        ? [
            {
              data: [
                (data as PieChartDataPoint[])[0]?.value || 0,
                (data as PieChartDataPoint[])[1]?.value || 0,
              ],
              backgroundColor: (data as PieChartDataPoint[]).map(
                (d) => d.color || "#D3D3D3"
              ),
              hoverBackgroundColor: (data as PieChartDataPoint[]).map(
                (d) => d.color || "#D3D3D3"
              ),
            },
          ]
        : [],
    };

    const options = {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: hasData },
      },
    };

    const centerTextPlugin = {
      id: "centerText",
      beforeDraw: (chart: Chart) => {
        if (!hasData) return;

        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        const dataset = chart.data.datasets[0].data || [0, 0];
        const femaleCount = dataset[0];
        const maleCount = dataset[1];

        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textX = width / 2;
        const textY = height / 2;

        ctx.fillText(`${femaleCount} Female`, textX, textY - 8);
        ctx.fillText(`${maleCount} Male`, textX, textY + 8);
        ctx.save();
      },
    };

    return hasData ? (
      <Pie data={chartData} options={options} plugins={[centerTextPlugin]} />
    ) : null;
  }

  return null;
};
