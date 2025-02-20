import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - support",
  description: "Your Dashboard Support",
};

export default async function Support() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success h-screen">
        <h1>Support</h1>
        <TopBar
          title="Support"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
