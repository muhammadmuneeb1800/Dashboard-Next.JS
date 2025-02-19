import TopBar from "@/components/topBar/TopBar";

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
