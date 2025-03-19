"use client";
import React from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import Link from "next/link";
import ScheduleModal from "../scheduleModal/ScheduleModal";
import Loader from "../loader/Loader";
import useMainSchedules from "./useMainSchedules";
import UpComingSchedule from "../upComingSchedule/UpComingSchedule";

export default function SchedulesComponent() {
  const { isOpen, appointments, isLoading, close } = useMainSchedules();
  return (
    <>
      <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[35%] h-auto">
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
        <hr className="mt-3" />
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader loading={isLoading} />
            </div>
          ) : appointments?.length > 0 ? (
            <div>
              {appointments?.map((app, index) => (
                <div key={index}>
                  <UpComingSchedule initialAppointment={app} close={close} />
                </div>
              ))}
              <Link
                href={"/dashboard/schedule"}
                className="flex justify-center items-center text-[12px] text-primary gap-2 mt-7 float-right"
              >
                <p className="font-semibold">View all</p>
                <div className="border p-1 rounded-lg cursor-pointer">
                  <FaAngleRight className="text-primary" />
                </div>
              </Link>
            </div>
          ) : (
            <p className="text-center text-sm">No appointment found</p>
          )}
        </div>
      </div>
      {isOpen && <ScheduleModal close={close} />}
    </>
  );
}
