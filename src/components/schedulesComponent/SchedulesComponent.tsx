"use client";

import Calendar from "@/components/calendor/Calendor";
import Modal from "@/components/modal/modal";
import TopBar from "@/components/topBar/TopBar";
import React, { useState } from "react";

export default function MainSchedules() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <TopBar
        title="Weekly Schedule"
        icon1="FaPlus"
        icon3="TbFilter"
        icon2="IoPrintOutline"
        icon4="MdOutlineContactSupport"
        onclick={openModal}
      />
      <div className="mt-5 bg-white">
        <Calendar />
      </div>

      {isModalOpen && <Modal close={closeModal} />}
    </div>
  );
}
