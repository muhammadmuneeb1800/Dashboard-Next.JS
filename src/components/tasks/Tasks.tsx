// import { TASK_DATA } from "@/constant/constant";
// import Link from "next/link";
// import React from "react";
// import { FaPlus } from "react-icons/fa";
// import TaskCard from "./taskCard/TaskCard";

// export default function Tasks() {
//   return (
//     <>
//       <div className="mt-3 px-3 md:px-5 py-3 bg-white rounded-md shadow w-full xl:w-[65%]">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-semibold">Tasks</p>
//           </div>
//           <Link
//             href={"/dashboard/task/"}
//             className="flex justify-center items-center font-medium gap-2 text-primary cursor-pointer"
//           >
//             <p className="text-sm font-semibold">New Tasks</p>
//             <div className="border cursor-pointer text-center p-1 rounded-md">
//               <FaPlus className="text-sm" />
//             </div>
//           </Link>
//         </div>
//         <div className="mt-5">
//           {TASK_DATA.map((tasks, index) => (
//             <div key={index} className="mt-3">
//               <TaskCard {...tasks} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
