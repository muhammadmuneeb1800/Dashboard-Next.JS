import Tasks from "@/components/tasks/Tasks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Tasks",
  description: "Your Dashboard Tasks here",
};

export default async function Task() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success h-screen">
        <h1>Tasks</h1>
        <Tasks />
      </div>
    </>
  );
}
