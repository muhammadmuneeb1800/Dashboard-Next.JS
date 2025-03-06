"use client";
import React, { useEffect, useState } from "react";
import TopBar from "../topBar/TopBar";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchTasksData } from "@/store/slices/taskSlice";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";

export default function Tasks() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);
  const AllTasks = useAppSelector((store) => store.tasksSlice.task) || [];
  const close = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TopBar
        title="Total Tasks"
        sabTitle={AllTasks.length.toLocaleString()}
        icon1="FaPlus"
        icon3="TbFilter"
        icon2="IoPrintOutline"
        icon4="MdOutlineContactSupport"
        onclick={close}
      />
      <div className="mt-5 bg-white w-full px-3 md:px-5 py-5 rounded-md shadow-md">
        {AllTasks.length > 0 ? (
          AllTasks?.map((task, index) => (
            <TaskCard key={index} {...task} close={close} />
          ))
        ) : (
          <p className="text-info text-center">No Task available.</p>
        )}
      </div>
      {isOpen && <TaskModal close={close} />}
    </>
  );
}
