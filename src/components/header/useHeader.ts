import { userAuth } from "@/store/slices/authSlice";
import { fetchNotification } from "@/store/slices/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import moment from "moment";
import { useEffect, useState } from "react";
import { showToast } from "../toast/Toast";
import { signOut } from "next-auth/react";

export default function useHeader() {
  const [search, setSearch] = useState<string>("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const date = moment(new Date()).format("DD,MMMM YYYY");
  const session = useAppSelector((store) => store.authSlice.user) || {};
  const dispatch = useAppDispatch();
  const noti =
    useAppSelector((store) => store.notificationSlice.notifications) || [];
  useEffect(() => {
    dispatch(userAuth());
    dispatch(fetchNotification());
  }, [dispatch]);

  const handelShowNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleLogout = async () => {
    await signOut();
    showToast("success", "Logout successful");
  };
  return {
    search,
    setSearch,
    notificationOpen,
    setNotificationOpen,
    date,
    session,
    noti,
    handelShowNotification,
    handleLogout,
  };
}
