"use client";
import {
  cardDetails,
  LineChartDataPoint,
  PieChartDataPoint,
} from "@/types/types";
import { BsThreeDots } from "react-icons/bs";
import { ChartComponent } from "../charts/Charts";

export default function GraphCard(props: cardDetails) {
  return (
    <>
      <div className="bg-white p-3 md:p-5 rounded-md w-full h-[200px] shadow">
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium">{props?.title}</p>
          <BsThreeDots className="text-black text-xl" />
        </div>
        <div className="flex justify-between gap-12 mt-5 items-center">
          <div>
            <p className="text-3xl font-bold mt-3 mb-5">{props?.number}</p>
            {props?.upAndDown && (
              <div
                className={`flex text-xl gap-2 ${
                  props?.upAndDown?.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                } font-medium`}
              >
                {props?.icon && <props.icon />}

                <p className={`text-sm`}>{props?.upAndDown || "0%"}</p>
              </div>
            )}
          </div>
          <div className="w-40 h-20">
            {props?.chart && (
              <ChartComponent
                type={props?.type as "line" | "pie"}
                status={props?.status || ""}
                data={
                  props?.type === "line"
                    ? (props?.chart as LineChartDataPoint[])
                    : (props?.chart as PieChartDataPoint[])
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
