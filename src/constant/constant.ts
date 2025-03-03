import {
  MdOutlineNotifications,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { SiSimpleanalytics } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";

export const MENU_ITEMS = [
  {
    name: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule",
    icon: GrSchedules,
    path: "/dashboard/schedule",
  },
  {
    name: "Tasks",
    icon: BiTask,
    path: "/dashboard/task",
  },
  {
    name: "Patients",
    icon: HiOutlineUsers,
    path: "/dashboard/patients",
  },
  {
    name: "Notifications",
    icon: MdOutlineNotifications,
    path: "/dashboard/notifications",
  },
  {
    name: "Analytics",
    icon: SiSimpleanalytics,
    path: "/dashboard/analytics",
  },
];

export const GENERAL_ITEMS = [
  {
    name: "Settings",
    icon: IoSettingsOutline,
    path: "/dashboard/settings",
  },
  {
    name: "Support",
    icon: MdContactSupport,
    path: "/dashboard/support",
  },
];
