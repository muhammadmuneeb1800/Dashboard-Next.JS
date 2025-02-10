import { LineChart1, LineChart2, PieCharts } from "@/components/charts/Charts";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
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

export const TASK_DATA = [
  {
    title: "Task Completed successfully",
    dis: "Sign up for Covid - 19 training course for medicians",
  },
  {
    title: "Task Completed successfully",
    dis: "Sign up for Covid - 19 training course for medicians",
  },
  {
    title: "Task Completed successfully",
    dis: "Sign up for Covid - 19 training course for medicians",
  },
];

export const PATIENTS = [
  {
    id: "1",
    name: "Mary Joseph",
    diagnosis: "Malaria",
    status: "Recovered",
    lastAppointment: "20/10/2022",
    nextAppointment: "1/12/2022",
  },
  {
    id: "2",
    name: "Amala Jones",
    diagnosis: "Stroke",
    status: "Awaiting surgery",
    lastAppointment: "11/10/2022",
    nextAppointment: "1/12/2022",
  },
  {
    id: "3",
    name: "Damilola Oyin",
    diagnosis: "Liver failure",
    status: "On treatment",
    lastAppointment: "9/10/2022",
    nextAppointment: "1/11/2022",
  },
  {
    id: "4",
    name: "Selim Jubril",
    diagnosis: "Typhoid",
    status: "Awaiting surgery",
    lastAppointment: "12/10/2022",
    nextAppointment: "2/12/2022",
  },
  {
    id: "5",
    name: "Paul Christian",
    diagnosis: "Gonorrhea",
    status: "On treatment",
    lastAppointment: "22/10/2022",
    nextAppointment: "3/12/2022",
  },
  {
    id: "6",
    name: "Rosabel Briggs",
    diagnosis: "Malaria",
    status: "Recovered",
    lastAppointment: "23/10/2022",
    nextAppointment: "4/12/2022",
  },
  {
    id: "7",
    name: "Tina Adekeye",
    diagnosis: "Syphilis",
    status: "Recovered",
    lastAppointment: "19/10/2022",
    nextAppointment: "5/12/2022",
  },
  {
    id: "8",
    name: "Mark Bossman",
    diagnosis: "Malaria",
    status: "Recovered",
    lastAppointment: "17/10/2022",
    nextAppointment: "2/12/2022",
  },
];

export const MENU_ITEMS = [
  {
    name: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/dashboard/",
  },
  {
    name: "Schedule",
    icon: GrSchedules,
    path: "/dashboard/schedule/",
  },
  {
    name: "Tasks",
    icon: BiTask,
    path: "/dashboard/task/",
  },
  {
    name: "Patients",
    icon: HiOutlineUsers,
    path: "/dashboard/patients/",
  },
  {
    name: "Messages",
    icon: MdMailOutline,
    path: "/dashboard/messages/",
  },
  {
    name: "Analytics",
    icon: SiSimpleanalytics,
    path: "/dashboard/analytics/",
  },
];

export const GENERAL_ITEMS = [
  {
    name: "Settings",
    icon: IoSettingsOutline,
    path: "/dashboard/settings/",
  },
  {
    name: "Support",
    icon: MdContactSupport,
    path: "/dashboard/support/",
  },
];

export const GRAPH_DATA = [
  {
    title: "Offline Consultations",
    number: 101,
    img: "/assets/images/graphBlue.png",
    upAndDown: "+3.11%",
    width: 200,
    iconColor: "text-green-700",
    icon: FaArrowAltCircleUp,
    chart: LineChart1,
  },
  {
    title: "Online Consultations",
    number: 96,
    img: "/assets/images/graphRed.png",
    width: 240,
    upAndDown: "-20.9%",
    iconColor: "text-red-700",
    icon: FaArrowAltCircleUp,
    chart: LineChart2,
  },
  {
    title: "Total Patients",
    number: 197,
    img: "/assets/images/graphBlue.png",
    width: 200,
    chart: PieCharts,
  },
];
