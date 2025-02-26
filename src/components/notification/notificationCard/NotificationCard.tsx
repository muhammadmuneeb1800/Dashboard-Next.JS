import React from "react";

export default function NotificationCard() {
  return (
    <>
      <div className="bg-white rounded-md shadow-md w-full">
        <div className="flex items-center justify-between p-3">
          <h3 className="text-xl font-medium">New Appointment</h3>
          <button className="text-sm text-gray-500">Mark as Read</button>
        </div>
        <div className="p-3">
          <p className="text-sm text-gray-600">
            John Doe visited your office on 20th Feb, 2022 at 10:30 AM.
          </p>
        </div>
        <div className="flex items-center justify-between p-3">
          <button className="text-sm text-blue-500">View Details</button>
          <button className="text-sm text-gray-500">Remove</button>
        </div>
      </div>
    </>
  );
}
