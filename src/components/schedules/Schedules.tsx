"use client";
import React, { useState } from "react";
import TopBar from "@/components/topBar/TopBar";
import ScheduleModal from "../scheduleModal/ScheduleModal";
import ScheduleCalendar from "../scheduleCalendar/ScheduleCalendar";

export default function MainSchedules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const close = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <TopBar
        title="Weekly Schedule"
        icon1="FaPlus"
        icon3="TbFilter"
        icon2="IoPrintOutline"
        icon4="MdOutlineContactSupport"
        onclick={close}
      />
      <div className="mt-5 rounded-lg bg-white">
        <ScheduleCalendar />
      </div>
      {isModalOpen && <ScheduleModal close={close} />}
    </div>
  );
}
