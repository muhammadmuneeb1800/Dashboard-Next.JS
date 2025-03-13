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

export const ChartComponent = ({ type, data, status }: ChartComponentProps) => {
  if (type === "line") {
    const lineData = data as RawDataPoint[];

    const createGradient = (
      ctx: CanvasRenderingContext2D,
      chartArea: { top: number; bottom: number },
      status: "online" | "offline"
    ) => {
      const colors =
        status === "offline"
          ? [
              "rgba(39, 174, 96, 1)",
              "rgba(39, 174, 96, 0.2)",
              "rgba(39, 174, 96, 0)",
            ]
          : [
              "rgba(235, 87, 87, 1)",
              "rgba(235, 87, 87, 0.2)",
              "rgba(235, 87, 87, 0)",
            ];

      const gradient = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.3, colors[1]);
      gradient.addColorStop(1, colors[2]);

      return gradient;
    };

    const isOnline = status === "online";

    const chartData = {
      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: !isOnline ? "Online" : "Offline",
          data: lineData,
          borderColor: !isOnline ? "rgb(39, 174, 96)" : "rgb(235, 87, 87)",
          borderWidth: 2,
          fill: true,
          backgroundColor: (context: {
            chart: {
              ctx: CanvasRenderingContext2D;
              chartArea?: { top: number; bottom: number };
            };
          }) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return "transparent";
            return createGradient(
              ctx,
              chartArea,
              isOnline ? "online" : "offline"
            );
          },
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: "index" as const,
          intersect: false,
        },
      },
      interaction: {
        mode: "index" as const,
        axis: "x" as const,
        intersect: false,
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
