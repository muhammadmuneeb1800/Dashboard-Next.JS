import {
  clearNotification,
  fetchNotification,
} from "@/store/slices/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { showToast } from "../toast/Toast";

export default function useNotificationCard() {
  const dispatch = useAppDispatch();
  const { notifications, isLoading } =
    useAppSelector((store) => store.notificationSlice) || [];
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const handleDeleteNotification = async (id: string) => {
    await dispatch(clearNotification(id));
    showToast("success", "Notification deleted successfully");
  };
  return {
    notifications,
    isLoading,
    handleDeleteNotification,
  };
}
