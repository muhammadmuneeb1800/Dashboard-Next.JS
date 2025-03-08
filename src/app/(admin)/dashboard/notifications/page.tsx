import { Metadata } from "next";
import DeleteAllNotifications from "@/components/deleteAllNotifications/DeleteAllNotifications";
import NotificationCard from "@/components/notificationCard/NotificationCard";

export const metadata: Metadata = {
  title: "Dashboard - Notifications",
  description: "Your Personal Doctor Dashboard.",
};

export default async function Notifications() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success min-h-screen">
        <h1>Notifications</h1>
        <div className="flex justify-between shadow items-center px-3 md:px-7 bg-white py-3 mt-5 rounded">
          <p className="text-xl font-medium">Notifications</p>
          <DeleteAllNotifications />
        </div>
        <div className="my-5">
          <NotificationCard />
        </div>
      </div>
    </>
  );
}
