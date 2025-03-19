"use client";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { initialAppointment } from "@/types/types";
import useUpComingSchedule from "./useUpComingSchedule";

export default function UpComingSchedule({
  initialAppointment,
  close,
}: {
  initialAppointment: initialAppointment;
  close: () => void;
}) {
  const {
    isOpen,
    start,
    hanleDeleteAppointment,
    end,
    handleOpenModal,
    handleUpdate,
  } = useUpComingSchedule(initialAppointment, close);
  return (
    <div className="">
      <div className="flex items-center md:gap-3 gap-2">
        <p className="text-gray-500">{start}</p>
        <div className="bg-black w-[12px] h-[12px] rounded-full"></div>
      </div>
      <div
        onClick={handleOpenModal}
        className="flex justify-between items-center ml-12 md:ml-16 mt-2 pl-4 border p-1 rounded-md cursor-pointer transition-all duration-700"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary w-[10px] h-[10px] rounded-full"></div>
          <p>{end}</p>
        </div>
        <p className="text-[10px] md:text-[12px]">
          {initialAppointment?.patientName}
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] md:text-[12px] text-gray-500">
            {initialAppointment?.appointmentType}
          </p>
          <div className="border p-1 rounded-lg">
            {isOpen ? (
              <FaChevronUp className="text-primary text-[12px]" />
            ) : (
              <FaChevronDown className="text-primary text-[12px]" />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="rounded-md border ml-12 md:ml-16 mt-2 py-2 transition-all duration-700">
          <div className="flex flex-col gap-3 pl-4 mb-3">
            <div className="flex items-center gap-5">
              <p className="text-[11px] md:text-[13px] font-semibold">
                Patient
              </p>
              <p className="text-[10px] md:text-[12px]">
                {initialAppointment?.patientName}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-[11px] md:text-[13px] font-semibold">Time</p>
              <p className="text-[11px] md:text-[13px]">
                {start} - {end}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-[11px] md:text-[13px] font-semibold">
                Purpose
              </p>
              <p className="text-[11px] md:text-[13px]">
                {initialAppointment?.purposeOfVisit}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between mt-3 px-3 md:px-5">
            <div className="flex items-center gap-3">
              <div
                onClick={hanleDeleteAppointment}
                className="border p-1 rounded-lg cursor-pointer"
              >
                <MdDeleteOutline className="text-red-600" />
              </div>
              <div className="border p-1 rounded-lg cursor-pointer">
                <LuUserRound className="text-primary" />
              </div>
              <div
                onClick={handleUpdate}
                className="border p-1 rounded-lg cursor-pointer"
              >
                <FaRegEdit className="text-primary" />
              </div>
            </div>
            <button className="bg-primary text-white p-2 rounded-md">
              Begin appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
