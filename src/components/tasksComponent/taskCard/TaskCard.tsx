import useAddTask from "@/hooks/useAddTask/useAddTask";
import { taskData } from "@/types/types";
import moment from "moment";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function TaskCard({
  close,
  ...props
}: taskData & { close: () => void }) {
  const date = moment(props.createdAt).format("DD MMM YYYY ");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleDelete, handleUpdate } = useAddTask(close);
  return (
    <>
      <div className="bg-success rounded px-3 py-5 md:p-5 flex justify-between shadow-sm items-center">
        <div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className={`w-6 h-6 md:w-8 md:h-8 appearance-none border-2 border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent 
              checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:items-center
               checked:after:justify-center checked:after:w-full checked:after:h-full`}
              name="checkbox"
              checked={props.status === "COMPLETED"}
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
          <p className="text-[11px] md:text-[15px]">{date}</p>
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="border cursor-pointer text-center p-[4px] md:p-2 rounded-md"
            >
              <BsThreeDots className="text-xl text-blue-600" />
            </div>
            {isOpen && (
              <div className="absolute top-10 border shadow-md right-10 bg-white rounded-md w-28 px-2 py-3 z-40 flex flex-col justify-center items-center gap-3">
                <button
                  onClick={() => {
                    close();
                    handleUpdate(props.id as string);
                    setIsOpen(!isOpen);
                  }}
                  className="text-base text-primary hover:bg-primary duration-500 hover:text-white font-bold px-3 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(props.id as string)}
                  className="text-base text-red-500 hover:bg-red-500 duration-500 hover:text-white font-bold px-3 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
