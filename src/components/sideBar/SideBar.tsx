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
    if (param === "/dashboard/patients/add-patients") {
      setActivePath("/dashboard/patients");
    } else {
      setActivePath(param);
    }
  }, []);
  return (
    <div
      className={`bg-white border-r w-[17%] border-light h-screen transition-width duration-300 ease-in-out fixed`}
    >
      <div className="flex items-center gap-2 justify-center py-1 text-center">
        <Image
          src="/assets/images/file.svg"
          alt="Logo"
          width={58}
          height={58}
        />
        <p className="hidden lg:block  text-primary lg:text-4xl mt-1 lg:font-medium">
          Medicare
        </p>
      </div>
      <hr className="mt-[7.5px] md:mt-[11px] lg:mt-[11.5px] w-full" />
      <p className="text-info md:text-xs text-[10px] mt-3 px-4">MENU</p>
      {MENU_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center px-5 text-lg mt-5 hover:text-primary ${
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
          <p className="hidden md:block text-base lg:text-lg">{item?.name}</p>
        </Link>
      ))}
      <hr className="mx-4 my-5 border-light" />
      <p className="text-info md:text-xs text-[10px] mt-3 px-4">GENERAL</p>
      {GENERAL_ITEMS?.map((item) => (
        <Link
          key={item?.path}
          href={item?.path}
          className={`flex items-center gap-1 px-5 text-lg mt-5 hover:text-primary ${
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
          <p className="hidden md:block text-base lg:text-lg">{item?.name}</p>
        </Link>
      ))}
    </div>
  );
}
