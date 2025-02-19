import TopBar from "@/components/topBar/TopBar";

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
