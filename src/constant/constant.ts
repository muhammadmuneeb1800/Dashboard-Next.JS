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

export const LINE_CHART_DATA = [
  { name: "Page A", uv: 4000, pv: 5400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 10098, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 5800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 12908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 400, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 6800, amt: 2500 },
];

export const LINE_CHART_DATA_SECOND = [
  { name: "Page A", uv: 4000, pv: 6400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 11800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 11800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 1800, amt: 2500 },
];

export const PIE_CHART_DATA = [
  { name: "Page A", value: 3500, color: "blue" },
  { name: "Page F", value: 2390, color: "red" },
];

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

export const MONTH_OF_YEAR = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
