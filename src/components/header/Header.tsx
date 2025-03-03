"use client";
import Input from "../input/Input";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { showToast } from "../toast/Toast";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { userAuth } from "@/store/slices/authSlice";
import moment from "moment";
import { fetchNotification } from "@/store/slices/notificationSlice";
import Link from "next/link";

export default function Header() {
  const [search, setSearch] = useState<string>("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const date = moment(new Date()).format("DD,MMMM YYYY");
  const session = useAppSelector((store) => store.authSlice.user) || {};
  const dispatch = useAppDispatch();
  const noti =
    useAppSelector((store) => store.notificationSlice.notifications) || [];
  console.log("notifications", noti);
  useEffect(() => {
    dispatch(userAuth());
    dispatch(fetchNotification());
  }, [dispatch]);
  return (
    <div className="w-full flex px-3 md:px-5 py-[10.8px] justify-between items-center gap-10 border-light border-b">
      <div className="w-[50%] lg:flex hidden justify-between items-center border border-light px-5 rounded">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="text-xl text-info ml-2" />
      </div>
      <div className="w-full flex lg:justify-end justify-between md:gap-4 lg:gap-14 items-center">
        <div>
          <p className="text-lg md:text-xl font-medium">{session?.name}</p>
          <p className="text-base md:text-lg font-bold">
            {session?.companyName}
          </p>
        </div>
        <div className="hidden md:block border p-2 rounded">{date}</div>
        <div className="flex justify-center items-center gap-5 md:gap-3 lg:gap-6">
          <CiMail className="text-2xl lg:text-3xl text-info cursor-pointer" />
          <button
            className="relative"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <IoMdNotificationsOutline className="text-2xl lg:text-3xl text-info cursor-pointer" />
          </button>
          {notificationOpen && (
            <>
              <div className="z-50 absolute top-16 py-3 overflow-x-hidden right-20 border shadow w-80 h-72 rounded bg-white px-5">
                <p className="text-primary text-start">All Notifications</p>
                <hr className="border border-primary mt-1" />
                {noti?.length > 0 ? (
                  noti?.map((notification) => {
                    return (
                      <div key={notification?.id}>
                        <p key={notification?.id} className="text-start mt-2">
                          {notification?.data}
                        </p>
                        <Link
                          onClick={() => setNotificationOpen(!notificationOpen)}
                          href={"/dashboard/notifications"}
                          className="flex absolute bottom-2 right-5 items-center gap-1"
                        >
                          <p className="text-primary text-xs">View all</p>
                          <div className="border rounded-lg cursor-pointer">
                            <FaAngleRight className="text-primary" />
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center mt-2">No notification available.</p>
                )}
              </div>
            </>
          )}
          <button
            onClick={async () => {
              await signOut();
              showToast("success", "Logout successful");
            }}
          >
            <FiLogOut className="text-2xl lg:text-3xl text-info cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
