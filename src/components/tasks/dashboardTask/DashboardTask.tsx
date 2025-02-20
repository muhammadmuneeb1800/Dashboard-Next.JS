"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchTasksData } from "@/store/slices/taskSlice";

export default function DashboardTask() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  const allTasks = useAppSelector((store) => store.tasksSlice.task) || [];
  console.log("all tasks", allTasks);
  const close = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[65%]">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Tasks</p>
          </div>
          <button
            onClick={close}
            className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
          >
            <p className="text-sm font-semibold">New Tasks</p>
            <div className="border cursor-pointer text-center p-1 rounded-md">
              <FaPlus className="text-sm" />
            </div>
          </button>
        </div>
        <div className="mt-5">
          {/* {allTasks?.map((tasks, index) => (
            <div key={index} className="mt-3">
              <TaskCard {...tasks} />
            </div>
          ))} */}
        </div>
      </div>

      {isOpen && <TaskModal close={close} />}
    </>
  );
}
