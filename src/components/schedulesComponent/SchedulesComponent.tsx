"use client";

import Calendar from "@/components/calendor/Calendor";
import ScheduleModal from "@/components/schedulesComponent/scheduleModal/ScheduleModal";
import TopBar from "@/components/topBar/TopBar";
import React, { useState } from "react";

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
      <div className="mt-5 bg-white">
        <Calendar />
      </div>

      {isModalOpen && <ScheduleModal close={close} />}
    </div>
  );
}
