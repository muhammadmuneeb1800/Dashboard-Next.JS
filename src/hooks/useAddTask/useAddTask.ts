import { showToast } from "@/components/toast/Toast";
import {
  addTasks,
  deleteTasks,
  updateTaskId,
  updateTasks,
} from "@/store/slices/taskSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useAddTask(close?: () => void) {
  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [status, setStatus] = useState<string>("NOT_COMPLETED");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const data = {
    doctorId: session?.user.id as string,
    title: title,
    description: des,
    status: status,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required");
      return;
    }
    if (!des) {
      alert("Description is required");
      return;
    }

    try {
      await dispatch(addTasks(data));
      showToast("success", "Task added successfully");
      if (close) {
        close();
      }
    } catch (error) {
      showToast("error", error as string);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTasks(id));
      showToast("success", "Task deleted successfully");
    } catch (error) {
      showToast("error", error as string);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await dispatch(updateTaskId(id));
    } catch (error) {
      showToast("error", error as string);
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: session?.user.id as string,
      doctorId: session?.user.id as string,
      title: title,
      description: des,
      status: status,
    };
    try {
      await dispatch(updateTasks(data));
      showToast("success", "Task updated successfully");
      if (close) close();
    } catch (error) {
      showToast("error", error as string);
    }
  };

  const clearTask = () => {
    setTitle("");
    setDes("");
    setStatus("NOT_COMPLETED");
  };

  return {
    title,
    setTitle,
    des,
    setDes,
    status,
    setStatus,
    handleSave,
    handleDelete,
    clearTask,
    dispatch,
    handleUpdateTask,
    handleUpdate,
  };
}
