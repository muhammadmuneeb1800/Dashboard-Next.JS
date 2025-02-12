import GraphCard from "@/components/graphCard/GrapCard";
import Task from "@/components/task/Task";
import { GRAPH_DATA, TASK_DATA } from "@/constant/constant";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Dashboard</h1>
        <div className="flex items-center gap-3">
          {GRAPH_DATA.map((card, index) => (
            <div key={index} className="w-full">
              <GraphCard {...card} />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="mt-3 px-5 py-3 bg-white rounded w-[65%]">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Tasks</p>
              </div>
              <Link href={"/dashboard/task/"} className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer">
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
          <div className="mt-3 px-5 py-3 bg-white rounded w-[35%]">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Upcomming Schedule</p>
              <Link href={"/dashboard/schedule/"} className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer">
                <p className="text-sm font-semibold">New Appointment</p>
                <div className="border cursor-pointer text-center p-1 rounded-md">
                  <FaPlus className="text-sm" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
