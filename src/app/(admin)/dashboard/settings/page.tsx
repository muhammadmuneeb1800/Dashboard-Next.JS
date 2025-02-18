import TopBar from "@/components/topBar/TopBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Settings</h1>
        <TopBar title="Settings" icon4="MdOutlineContactSupport" />
      </div>
    </>
  );
}
