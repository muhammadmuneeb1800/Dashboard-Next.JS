import Header from "@/components/header/Header";
import SideBar from "@/components/sideBar/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen w-full">
        <Header />
        <div className="flex overflow-hidden">
          <SideBar />
          {children}
        </div>
      </div>
    </>
  );
}
