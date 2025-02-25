"use client"

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import UpCommingSchedule from "../upCommingSchedule/UpCommingSchedule";
import ScheduleModal from "../scheduleModal/ScheduleModal";

export default function SchedulesComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const close = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[35%]">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Upcomming Schedule</p>
          <button
            onClick={close}
            className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
          >
            <p className="text-sm font-semibold">New Appointment</p>
            <div className="border cursor-pointer text-center p-1 rounded-md">
              <FaPlus className="text-sm" />
            </div>
          </button>
        </div>
        <div className="mt-5">
          <UpCommingSchedule />
        </div>
      </div>
      {isOpen && <ScheduleModal close={close} />}
    </>
  );
}
