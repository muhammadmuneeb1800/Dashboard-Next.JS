import { Metadata } from "next";
import Notification from "@/components/notification/Notification";
export const metadata: Metadata = {
  title: "Dashboard - Notifications",
  description: "Your Personal Doctor Dashboard.",
};

export default async function Notifications() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success min-h-screen">
        <h1>Notifications</h1>
        <Notification />
      </div>
    </>
  );
}
