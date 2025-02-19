import GraphCard from "@/components/graphCard/GrapCard";
import Task from "@/components/task/Task";
import UpCommingSchedule from "@/components/upCommingSchedule/UpCommingSchedule";
import { GRAPH_DATA, TASK_DATA } from "@/constant/constant";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Dashboard() {
  return (
    <>
      <div className="md:px-5 p-3 w-full bg-success">
        <h1 className="mb-2">Dashboard</h1>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
          {GRAPH_DATA.map((card, index) => (
            <div key={index} className="w-full">
              <GraphCard {...card} />
            </div>
          ))}
        </div>
        <div className="flex flex-col xl:flex-row justify-center gap-4">
          <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[65%]">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Tasks</p>
              </div>
              <Link
                href={"/dashboard/task/"}
                className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
              >
                <p className="text-sm font-semibold">New Tasks</p>
                <div className="border cursor-pointer text-center p-1 rounded-md">
                  <FaPlus className="text-sm" />
                </div>
              </Link>
            </div>
            <div className="mt-5">
              {TASK_DATA.map((tasks, index) => (
                <div key={index} className="mt-3">
                  <Task {...tasks} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[35%]">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Upcomming Schedule</p>
              <Link
                href={"/dashboard/schedule/"}
                className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
              >
                <p className="text-sm font-semibold">New Appointment</p>
                <div className="border cursor-pointer text-center p-1 rounded-md">
                  <FaPlus className="text-sm" />
                </div>
              </Link>
            </div>
            <div className="mt-5">
              <UpCommingSchedule />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
