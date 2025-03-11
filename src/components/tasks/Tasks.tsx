"use client";
import React, { useEffect } from "react";
import TopBar from "../topBar/TopBar";
import { useAppSelector } from "@/store/store";
import { fetchTasksData } from "@/store/slices/taskSlice";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";
import useAddTask from "@/hooks/useAddTask/useAddTask";
import Loader from "../loader/Loader";

export default function Tasks() {
  const { isOpenModal, openModal, dispatch } = useAddTask();
  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);
  const { task, isLoading } = useAppSelector((store) => store.tasksSlice) || [];

  return (
    <>
      <TopBar
        title="Total Tasks"
        sabTitle={task.length.toLocaleString()}
        icon1="FaPlus"
        icon3="TbFilter"
        icon2="IoPrintOutline"
        icon4="MdOutlineContactSupport"
        onclick={openModal}
      />
      <div className="mt-5 bg-white w-full px-3 md:px-5 py-5 rounded-md shadow-md">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader loading={isLoading} />
          </div>
        ) : task.length > 0 ? (
          task.map((task, index) => (
            <TaskCard key={index} {...task} close={openModal} />
          ))
        ) : (
          <p className="text-info text-center">No Task available.</p>
        )}
      </div>
      {isOpenModal && <TaskModal close={openModal} />}
    </>
  );
}
