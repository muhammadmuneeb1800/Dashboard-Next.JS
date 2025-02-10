"use client";

import { useState } from "react";
import { IoPrintOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineContactSupport } from "react-icons/md";
import { TbFilter } from "react-icons/tb";
import TopBar from "@/components/topBar/TopBar";
import Calendar from "@/components/calendor/Calendor";
import AddSchedule from "@/components/addSchedule/AddSchedule";

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Schedule</h1>
        <TopBar
          title="Weekly schedule from 25th to 1st November 2022"
          icon1={FaPlus}
          icon3={TbFilter}
          icon2={IoPrintOutline}
          icon4={MdOutlineContactSupport}
          onclick={openModal}
        />
        <div className="mt-5 bg-white">
          <Calendar />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[600px] rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <AddSchedule />
          </div>
        </div>
      )}
    </>
  );
}
