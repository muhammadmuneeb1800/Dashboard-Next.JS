import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import UpCommingSchedule from "../upCommingSchedule/UpCommingSchedule";

export default function SchedulesComponent() {
  return (
    <>
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
    </>
  );
}
