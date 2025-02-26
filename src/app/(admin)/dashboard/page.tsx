import MainCards from "@/components/cards/mainCards/MainCards";
import SchedulesComponent from "@/components/schedulesComponent/mainSchedules/MainSchedules";
import DashboardTask from "@/components/tasksComponent/dashboardTask/DashboardTask";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Personal Doctor Dashboard.",
};

export default async function Dashboard() {
  return (
    <>
      <div className="md:px-5 p-3 w-full bg-success min-h-screen">
        <h1 className="mb-2">Dashboard</h1>
        <MainCards />
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <DashboardTask />
          <SchedulesComponent />
        </div>
      </div>
    </>
  );
}
