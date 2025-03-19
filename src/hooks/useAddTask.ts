import { showToast } from "@/components/toast/Toast";
import {
  addTasks,
  deleteTasks,
  fetchTasksData,
  resetUpdateTaskId,
  updateTaskId,
  updateTasks,
} from "@/store/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAddTask(close?: () => void) {
  const [title, setTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [des, setDes] = useState<string>("");
  const [status, setStatus] = useState<string>("NOT_COMPLETED");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalTwo, setIsOpenModalTwo] = useState(false);
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((store) => store.tasksSlice) || [];
  const update = useAppSelector((store) => store.tasksSlice.updateTask) || null;
  useEffect(() => {
    if (update) {
      setTitle(update.title as string);
      setDes(update.description as string);
      setStatus(update.status as string);
    } else {
      setTitle("");
      setDes("");
      setStatus("");
    }
  }, [update]);
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTasksData()).then(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    dispatch(fetchTasksData());
  }, []);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const openModalTwo = () => {
    setIsOpenModalTwo(!isOpenModalTwo);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingStart(true);
    if (!title) {
      showToast("error", "Title is required");
      setIsLoadingStart(false);
      return;
    }
    if (!des) {
      showToast("error", "Description is required");
      setIsLoadingStart(false);
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
      setIsLoadingStart(false);
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
    setIsLoadingStart(true);
    const data = {
      id: id,
      doctorId: session?.user.id as string,
      title: title,
      description: des,
      status: status || "NOT_COMPLETED",
    };
    try {
      await dispatch(updateTasks(data));
      setIsLoadingStart(false);
      dispatch(fetchTasksData());
      showToast("success", "Task updated successfully");
      if (close) close();
    } catch (error) {
      showToast("error", error as string);
    } finally {
      setIsLoadingStart(false);
    }
  };

  const clearTask = () => {
    setTitle("");
    setDes("");
    setStatus("NOT_COMPLETED");
  };

  const addTaskModalOpen = () => {
    openModalTwo();
    dispatch(resetUpdateTaskId());
  };

  return {
    task,
    isLoading,
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
    isLoadingStart,
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
    addTaskModalOpen,
    update,
  };
}
