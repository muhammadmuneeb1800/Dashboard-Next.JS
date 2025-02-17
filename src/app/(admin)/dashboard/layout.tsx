import Header from "@/components/header/Header";
import SideBar from "@/components/sideBar/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Children in Layout:", children); // Debugging ke liye

  return (
    <div className="flex items-center w-full">
      <div className="w-[17%] h-screen fixed top-0 left-0">
        <SideBar />
      </div>
      <div className="w-[83%] h-screen absolute right-0 top-0 ">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
