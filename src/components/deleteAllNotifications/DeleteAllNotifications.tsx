"use client";
import React from "react";
import Button from "../button/Button";
import { useAppDispatch } from "@/store/store";
import { deleteAllNotification } from "@/store/slices/notificationSlice";
import { showToast } from "../toast/Toast";

export default function DeleteAllNotifications() {
  const dispatch = useAppDispatch();
  const dellete = async () => {
    try {
      await dispatch(deleteAllNotification()).unwrap();
      showToast("success", "Successfully deleted all notifications");
    } catch (error) {
      console.error("Error deleting notifications:", error);
      showToast("error", "Failed to delete notifications");
    }
  };
  return (
    <>
      <Button
        onClick={dellete}
        text="Delete All"
        color="text-white"
        bg="bg-red-500"
        hColor="text-red-500"
        hBg="bg-white"
        borderColor="border-red-500"
      />
    </>
  );
}
