"use client";

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

interface ChartComponentProps {
  type: "line" | "pie";
  data: any[];
  color?: string;
}

export const ChartComponent = ({
  type,
  data,
  color = "#2F80ED",
}: ChartComponentProps) => {
  if (type === "line") {
    const chartData = {
      labels: data.map((_, index) => index + 1),
      datasets: [
        {
          label: "Online Status",
          data: data.map((d) => d.isOnline),
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
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
    // Check if data is available and valid
    const hasData =
      data.length > 0 &&
      data.every((d) => d.value !== undefined && d.value !== null);

    const chartData = {
      labels: ["Female", "Male"],
      datasets: hasData
        ? [
            {
              data: [data[0]?.value || 0, data[1]?.value || 0],
              backgroundColor: [
                data[0]?.color || "#D3D3D3",
                data[1]?.color || "#D3D3D3",
              ],
              hoverBackgroundColor: [
                data[0]?.color || "#D3D3D3",
                data[1]?.color || "#D3D3D3",
              ],
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
      beforeDraw: (chart: any) => {
        if (!hasData) return; // Don't draw text if no data

        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        const femaleCount = data[0]?.value || 0;
        const maleCount = data[1]?.value || 0;

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
    ) : null; // If no data, return null (hide the chart)
  }

  return null;
};
