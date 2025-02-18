import TopBar from "@/components/topBar/TopBar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Analytics() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
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
