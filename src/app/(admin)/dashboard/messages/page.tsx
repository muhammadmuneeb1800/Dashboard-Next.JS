import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Messages",
  description: "Your Personal Doctor Dashboard.",
};

export default async function Message() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success h-screen">
        <h1>Message</h1>
        <TopBar
          title="Messages"
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
