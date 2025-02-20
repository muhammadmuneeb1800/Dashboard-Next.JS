import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard / Analytics",
  description: "Your Analytics of your personal Dashboard.",
};

export default async function Analytics() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success h-screen">
        <h1>Analytics</h1>
        <TopBar
          title="Analytics"
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
