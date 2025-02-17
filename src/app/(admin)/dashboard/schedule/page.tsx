"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/topBar/TopBar";
import Calendar from "@/components/calendor/Calendor";
import AddSchedule from "@/components/addSchedule/AddSchedule";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Modal from "@/components/modal/modal";

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function Session() {
      const sessionData = await getSession();
      if (!sessionData) {
        redirect("/login");
      }
    }
    Session();
  }, []);

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
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
          onclick={openModal}
        />
        <div className="mt-5 bg-white">
          <Calendar />
        </div>
      </div>

      {isModalOpen && <Modal />}
    </>
  );
}
