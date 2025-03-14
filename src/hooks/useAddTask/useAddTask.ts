import { showToast } from "@/components/toast/Toast";
import {
  addTasks,
  deleteTasks,
  fetchTasksData,
  updateTaskId,
  updateTasks,
} from "@/store/slices/taskSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useAddTask(close?: () => void) {
  const [title, setTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [des, setDes] = useState<string>("");
  const [status, setStatus] = useState<string>("NOT_COMPLETED");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalTwo, setIsOpenModalTwo] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const openModalTwo = () => {
    setIsOpenModalTwo(!isOpenModalTwo);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!title) {
      showToast("error", "Title is required");
      setIsLoading(false);
      return;
    }
    if (!des) {
      showToast("error", "Description is required");
      setIsLoading(false);
      return;
    }
    const data = {
      doctorId: session?.user.id as string,
      title: title,
      description: des,
      status: status || "NOT_COMPLETED",
    };
    try {
      await dispatch(addTasks(data));
      setIsLoading(false);
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

  const handleUpdateTask = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: id,
      doctorId: session?.user.id as string,
      title: title,
      description: des,
      status: status || "NOT_COMPLETED",
    };
    try {
      await dispatch(updateTasks(data));
      setIsLoading(false);
      dispatch(fetchTasksData());
      showToast("success", "Task updated successfully");
      if (close) close();
    } catch (error) {
      showToast("error", error as string);
    } finally {
      setIsLoading(false);
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
    isLoading,
    isOpen,
    setIsOpen,
    handleUpdateTask,
    handleUpdate,
    isOpenModal,
    setIsOpenModal,
    openModal,
    openModalTwo,
    isOpenModalTwo,
    setIsOpenModalTwo,
  };
}
