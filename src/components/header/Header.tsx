"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "../input/Input";
import { FaSearch } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const [search,setSearch] = useState<string>("")
  return (
    <div className="flex items-center px-5 border-b border-light">
      <div className="w-64 text-center border-r border-light pr-2 py-2">
        <Link href="/dashboard/" className="text-center justify-center">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={230}
            height={170}
          />
        </Link>
      </div>
      <div className="w-full flex justify-between items-center gap-10 pl-5 py-2">
        <div className="w-[50%] flex justify-between items-center border border-light px-5 rounded">
          <Input placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
          <FaSearch className="text-xl text-info ml-2" />
        </div>
        <div className="flex justify-center gap-7 items-center">
          <div>
            <p className="text-xl font-medium">Name</p>
            <p className="text-lg font-bold">Industry</p>
          </div>
          <div className="border p-2 rounded">22, October 2022</div>
          <CiMail className="text-3xl text-info cursor-pointer" />
          <IoMdNotificationsOutline className="text-3xl text-info cursor-pointer" />
          <FiLogOut className="text-3xl text-info cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
