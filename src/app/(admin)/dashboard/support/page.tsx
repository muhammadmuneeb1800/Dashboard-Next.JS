"use client";
import TopBar from "@/components/topBar/TopBar";
import { FaPlus } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { TbFilter } from "react-icons/tb";

export default function Support() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Support</h1>
        <TopBar
          title="Support Page"
          icon1={FaPlus}
          icon3={TbFilter}
          icon2={IoPrintOutline}
          icon4={MdOutlineContactSupport}
        />
      </div>
    </>
  );
}
