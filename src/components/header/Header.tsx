"use client";
import Input from "../input/Input";
import { FaSearch } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { MONTH_OF_YEAR } from "@/constant/constant";
import { signOut } from "@/lib/auth";
import { useAppSelector } from "@/store/store";

export default function Header() {
  const [search, setSearch] = useState<string>("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const user = useAppSelector((store) => store.authSlice) || {};
  console.log("user data fom header", user.user);

  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <div className="w-full flex px-5 py-4 justify-between items-center gap-10 border-light border-b">
      <div className="w-[50%] flex justify-between items-center border border-light px-5 rounded">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="text-xl text-info ml-2" />
      </div>
      <div className="flex justify-center gap-7 items-center">
        <div>
          <p className="text-xl font-medium">{user?.user.userName}</p>
          <p className="text-lg font-bold">{user?.user?.companyName}</p>
        </div>
        <div className="border p-2 rounded">
          {day + "," + MONTH_OF_YEAR[month] + " " + year}
        </div>
        <CiMail className="text-3xl text-info cursor-pointer" />
        <button
          className="relative"
          onClick={() => setNotificationOpen(!notificationOpen)}
        >
          <IoMdNotificationsOutline className="text-3xl text-info cursor-pointer" />
          {notificationOpen && (
            <div className="z-50 absolute top-10 py-3 overflow-x-hidden right-7 border shadow-md w-80 h-72 rounded bg-white px-5">
              <p className="text-primary text-start">All Notifications</p>
              <hr className="border border-primary mt-1" />
              {isNotification ? (
                <p className="text-primary text-start">
                  You have new notifications.
                </p>
              ) : (
                <p className="text-center mt-2">No notification available.</p>
              )}
            </div>
          )}
        </button>
        <button onClick={() => signOut()}>
          <FiLogOut className="text-3xl text-info cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
