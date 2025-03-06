"use client";
import React from "react";
import Button from "../button/Button";
import { useAppDispatch } from "@/store/store";
import { deleteAllNotification } from "@/store/slices/notificationSlice";
import { showToast } from "../toast/Toast";
import NotificationCard from "../notificationCard/NotificationCard";

export default function Notification() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex justify-between shadow items-center px-3 md:px-7 bg-white py-3 mt-5 rounded">
        <p className="text-xl font-medium">Notifications</p>
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
      </div>
      <div className="my-5">
        <NotificationCard />
      </div>
    </>
  );
}
