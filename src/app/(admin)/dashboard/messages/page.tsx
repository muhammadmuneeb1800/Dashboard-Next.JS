import TopBar from "@/components/topBar/TopBar";

export default async function Message() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success h-screen">
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
