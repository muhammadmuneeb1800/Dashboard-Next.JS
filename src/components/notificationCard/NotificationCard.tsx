"use client";
import React from "react";
import Link from "next/link";
import Loader from "../loader/Loader";
import useNotificationCard from "./useNotificationCard";

export default function NotificationCard() {
  const { notifications, isLoading, handleDeleteNotification } =
    useNotificationCard();
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-5">
          <Loader loading={isLoading} />
        </div>
      ) : notifications?.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-gray-600 text-sm">No new notifications.</p>
        </div>
      ) : (
        notifications?.map((noti, index) => (
          <div key={index} className="my-5">
            <div className="bg-white rounded-md shadow w-full p-3">
              <div className="pt-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">New Appointment</h3>
                <Link
                  href={"/dashboard/schedule"}
                  className="text-sm text-gray-500 hover:underline"
                >
                  View details
                </Link>
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-600">{noti?.data}</p>
              </div>
              <div className="flex justify-end p-2">
                <button
                  onClick={() => handleDeleteNotification(noti?.id as string)}
                  className="text-sm text-red-500 hover:text-red-700 transition"
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
