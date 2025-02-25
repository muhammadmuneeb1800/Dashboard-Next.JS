"use client";
import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

export default function UpCommingSchedule() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <div className="flex items-center md:gap-5 gap-3">
        <p className="text-gray-500">8:00</p>
        <div className="bg-black w-[12px] h-[12px] rounded-full"></div>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center ml-12 md:ml-16 mt-2 pl-4 border p-1 rounded-md cursor-pointer transition-all duration-700 scroll-smooth"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary w-[10px] h-[10px] rounded-full"></div>
          <p>9:00</p>
        </div>
        <p className="text-[13px] md:text-[15px]">Muhammad</p>
        <div className="flex items-center gap-3">
          <p className="text-[11px] md:text-[13px] text-gray-500">OnGoing</p>
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
        <div className="rounded-md border ml-12 md:ml-16 mt-2 py-4 transition-all duration-700">
          <div className="flex flex-col gap-3 pl-4 mb-3">
            <div className="flex items-center gap-5">
              <p className="text-[12px] md:text-[14px] font-semibold">
                Patient
              </p>
              <p className="text-[11px] md:text-[13px]">Muhammad</p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-[12px] md:text-[14px] font-semibold">Time</p>
              <p className="text-[11px] md:text-[13px]">8:00 - 9:00</p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-[12px] md:text-[14px] font-semibold">
                Purpose
              </p>
              <p className="text-[11px] md:text-[13px]">General check-up</p>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between mt-3 px-3 md:px-5">
            <div className="flex items-center gap-3">
              <div className="border p-1 rounded-lg cursor-pointer">
                <MdDeleteOutline className="text-red-600" />
              </div>
              <div className="border p-1 rounded-lg cursor-pointer">
                <LuUserRound className="text-primary" />
              </div>
              <div className="border p-1 rounded-lg cursor-pointer">
                <FaRegEdit className="text-primary" />
              </div>
            </div>
            <button className="bg-primary text-white p-2 rounded-md">
              Begin appointment
            </button>
          </div>
        </div>
      )}
      <button className="flex justify-center items-center text-[12px] text-primary gap-2 mt-7 float-right">
        <p className="font-semibold">View all</p>
        <div className="border p-1 rounded-lg cursor-pointer">
          <FaAngleRight className="text-primary" />
        </div>
      </button>
    </div>
  );
}
