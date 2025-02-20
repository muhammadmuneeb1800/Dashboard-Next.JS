import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard / Settings",
  description: "Your Dashboard Settings",
};


export default async function Settings() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Settings</h1>
        <TopBar title="Settings" icon4="MdOutlineContactSupport" />
      </div>
    </>
  );
}
