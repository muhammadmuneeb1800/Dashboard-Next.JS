import TopBar from "@/components/topBar/TopBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Support() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
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
