"use client";
import React, { useEffect } from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import TaskModal from "../taskModal/TaskModal";
import { useAppSelector } from "@/store/store";
import { fetchTasksData, resetUpdateTaskId } from "@/store/slices/taskSlice";
import TaskCard from "../taskCard/TaskCard";
import Link from "next/link";
import useAddTask from "@/hooks/useAddTask/useAddTask";
import Loader from "../loader/Loader";

export default function DashboardTask() {
  const { dispatch, openModalTwo, isOpenModalTwo } = useAddTask();
  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);
  const { task, isLoading } = useAppSelector((store) => store.tasksSlice) || [];
  return (
    <>
      <div className="mt-3 px-3 md:px-5 py-3 pb-5 lg:pb-7 bg-white rounded-md shadow w-full xl:w-[65%] h-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Tasks</p>
          </div>
          <button
            onClick={() => {
              openModalTwo();
              dispatch(resetUpdateTaskId());
            }}
            className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
          >
            <p className="text-sm font-semibold">New Tasks</p>
            <div className="border cursor-pointer text-center p-1 rounded-md">
              <FaPlus className="text-sm" />
            </div>
          </button>
        </div>
        <hr className="mt-3" />
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader loading={isLoading} />
            </div>
          ) : task.length > 0 ? (
            <>
              {task.map((tasks, index) => (
                <div key={index} className="mt-3">
                  <TaskCard {...tasks} close={openModalTwo} />
                </div>
              ))}

              <Link
                href={"/dashboard/task"}
                className="flex justify-center items-center text-[12px] text-primary gap-2 mt-5 float-right"
              >
                <p className="font-semibold">View all</p>
                <div className="border p-1 rounded-lg cursor-pointer">
                  <FaAngleRight className="text-primary" />
                </div>
              </Link>
            </>
          ) : (
            <p className="text-center text-sm">No tasks found</p>
          )}
        </div>
      </div>

      {isOpenModalTwo && <TaskModal close={openModalTwo} />}
    </>
  );
}
