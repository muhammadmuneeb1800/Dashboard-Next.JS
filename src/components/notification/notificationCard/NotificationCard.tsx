"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  clearNotification,
  fetchNotification,
} from "@/store/slices/notificationSlice";
import { showToast } from "@/components/toast/Toast";
import Link from "next/link";

export default function NotificationCard() {
  const dispatch = useAppDispatch();
  const noti =
    useAppSelector((store) => store.notificationSlice.notifications) || [];
  console.log("notifications", noti);
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);
  return (
    <>
      {noti?.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-gray-600 text-sm">No new notifications.</p>
        </div>
      ) : (
        noti?.map((noti, index) => (
          <div key={index} className="my-5">
            <div className="bg-white rounded-md shadow-md w-full p-3">
              <div className="pt-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">New Appointment</h3>
                <Link href={"/dashboard/schedule"} className="text-sm text-gray-500">View details</Link>
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-600">{noti?.data}</p>
              </div>
              <div className="flex justify-end p-2">
                <button
                  onClick={async () => {
                    await dispatch(clearNotification(noti?.id as string));
                    showToast("success", "Notifications deleted successfully");
                  }}
                  className="text-sm text-gray-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
