"use client";
import { LineChart, Line, PieChart, Pie, Cell, Label } from "recharts";
import {
  LINE_CHART_DATA,
  LINE_CHART_DATA_SECOND,
  PIE_CHART_DATA,
} from "@/constant/constant";
type ViewBoxType = { cx: number; cy: number };
export const LineChart1 = () => {
  
  return (
    <LineChart data={LINE_CHART_DATA} width={200} height={100}>
      <Line
        type={"monotone"}
        dataKey="pv"
        dot={false}
        stroke="#2F80ED"
        strokeWidth={2}
      />
    </LineChart>
  );
};

export const LineChart2 = () => {
  return (
    <LineChart data={LINE_CHART_DATA_SECOND} width={200} height={100}>
      <Line
        type="monotone"
        dataKey="pv"
        dot={false}
        stroke="#EB5757"
        strokeWidth={2}
      />
    </LineChart>
  );
};

export const PieCharts = () => {
  return (
    <PieChart width={150} height={100}>
      <Pie
        data={PIE_CHART_DATA}
        innerRadius={30}
        outerRadius={45}
        cx="50%"
        cy="50%"
        dataKey="value"
      >
        {PIE_CHART_DATA.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}

        <Label
          content={({ viewBox }) => {
            const { cx, cy }: ViewBoxType = viewBox;
            return (
              <>
                <text
                  x={cx}
                  y={cy - 5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                  fontWeight="bold"
                  fill="blue"
                >
                  110 Female
                </text>
                <text
                  x={cx}
                  y={cy + 10}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                  fontWeight="bold"
                  fill="red"
                >
                  87 Male
                </text>
              </>
            );
          }}
        />
      </Pie>
    </PieChart>
  );
};
