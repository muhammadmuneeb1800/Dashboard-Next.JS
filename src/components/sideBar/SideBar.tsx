"use client";
import Link from "next/link";
import { GENERAL_ITEMS, MENU_ITEMS } from "@/constant/constant";
import { useState } from "react";

export default function SideBar() {
  const [activePath, setActivePath] = useState("/dashboard/");
  // useEffect(() => {
  //   setActivePath(activePath);
  // }, [pathName]);

  return (
    <div
      className={`w-[275px] border-r border-light h-screen p-6 transition-width duration-300 ease-in-out fixed`}
    >
      <p className="text-info text-xs mt-3">MENU</p>
      {MENU_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center gap-1 text-lg mt-4 hover:text-primary ${
            activePath === item?.path ? "text-primary" : "text-info"
          }`}
          onClick={() => setActivePath(item.path)}
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
      <p className="text-info text-xs mt-3">GENERAL</p>
      {GENERAL_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center gap-1 text-lg mt-4 hover:text-primary ${
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
