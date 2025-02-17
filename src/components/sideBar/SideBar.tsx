"use client";
import Link from "next/link";
import { GENERAL_ITEMS, MENU_ITEMS } from "@/constant/constant";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const [activePath, setActivePath] = useState("");
  const param = usePathname();

  useEffect(() => {
    setActivePath(param);
  }, [param]);
  return (
    <div
      className={`w-[260px] bg-white border-light h-screen transition-width duration-300 ease-in-out fixed border-r`}
    >
      <div className="flex w-auto justify-center py-2 text-center">
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={200}
          height={170}
        />
      </div>
      <hr />
      <p className="text-info text-xs mt-3 px-4">MENU</p>
      {MENU_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center gap-1 px-5 text-lg mt-4 hover:text-primary ${
            activePath === item?.path ? "text-primary" : "text-info"
          }`}
          onClick={() => setActivePath(item?.path)}
        >
          {activePath === item?.path && (
            <div className="w-[6px] h-9 bg-primary rounded-r-xl absolute left-0"></div>
          )}
          <div className="text-2xl mr-2">
            <item.icon />
          </div>
          <p>{item?.name}</p>
        </Link>
      ))}
      <hr className="mx-4 my-5 border-light" />
      <p className="text-info text-xs mt-3 px-4">GENERAL</p>
      {GENERAL_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center gap-1 px-5 text-lg mt-4 hover:text-primary ${
            activePath === item?.path ? "text-primary" : "text-info"
          }`}
          onClick={() => setActivePath(item?.path)}
        >
          {activePath === item?.path && (
            <div className="w-[6px] h-9 bg-primary rounded-r-xl absolute left-0"></div>
          )}
          <div className="text-2xl mr-2">
            <item.icon />
          </div>
          <p>{item?.name}</p>
        </Link>
      ))}
    </div>
  );
}
