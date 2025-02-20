import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard / Tasks",
  description: "Your Dashboard Tasks here",
};

export default async function Task() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success h-screen">
        <h1>Task</h1>
        <TopBar
          title="Tasks"
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
