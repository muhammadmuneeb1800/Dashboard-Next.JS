"use client";
import React from "react";
import Button from "../button/Button";
import { useAppDispatch } from "@/store/store";
import { deleteAllNotification } from "@/store/slices/notificationSlice";
import { showToast } from "../toast/Toast";

export default function DeleteAllNotifications() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        onClick={async () => {
          await dispatch(deleteAllNotification());
          showToast("success", "success fully deleted all notifications");
        }}
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
