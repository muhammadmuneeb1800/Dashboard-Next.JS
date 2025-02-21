import { taskData } from "@/types/types";
import { BsThreeDots } from "react-icons/bs";

export default function TaskCard(props: taskData) {
  return (
    <>
      <div className="bg-success rounded px-3 py-5 md:p-5 flex justify-between shadow-sm items-center">
        <div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-6 h-6 md:w-8 md:h-8 appearance-none border-2 border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent 
              checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:items-center
               checked:after:justify-center checked:after:w-full checked:after:h-full"
              name="checkbox"
              id="checkbox"
            />
            <label
              htmlFor="checkbox"
              className="text-[15px] md:text-lg font-medium"
            >
              {props?.title}
            </label>
          </div>
          <p className="md:pl-12 pl-9 text-[11px] md:text-[14px]">
            {props?.description}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-10">
          <p className="text-[11px] md:text-[15px]">24 Oct 2022</p>
          <div className="border cursor-pointer text-center p-[4px] md:p-2 rounded-md">
            <BsThreeDots className="text-xl text-blue-600" />
          </div>
        </div>
      </div>
    </>
  );
}
