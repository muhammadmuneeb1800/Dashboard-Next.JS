import SchedulesComponent from "@/components/schedulesComponent/mainSchedules/MainSchedules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard / Schedules",
  description: "Your Appointments schedule is available here",
};

export default function Schedule() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Schedule</h1>
        <SchedulesComponent />
      </div>
    </>
  );
}
