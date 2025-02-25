import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Notifications",
  description: "Your Personal Doctor Dashboard.",
};

export default async function Notifications() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success min-h-screen">
        <h1>Notifications</h1>
        <TopBar
          title="Notifications"
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
