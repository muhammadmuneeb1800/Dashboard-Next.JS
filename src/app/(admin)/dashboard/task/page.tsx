import TopBar from "@/components/topBar/TopBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Task() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Task</h1>
        <TopBar
          title="Task Page"
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
      </div>
    </>
  );
}
