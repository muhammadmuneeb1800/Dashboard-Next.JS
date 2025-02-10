import { BsThreeDots } from "react-icons/bs";

interface taskDetails {
  title: string;
  dis: string;
}

export default function Task(props: taskDetails) {
  return (
    <>
      <div className="bg-success p-5 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-8 h-8 appearance-none border-2 border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent 
              checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:items-center
               checked:after:justify-center checked:after:w-full checked:after:h-full"
              name="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox" className="text-lg font-medium">
              {props.title}
            </label>
          </div>
          <p className="pl-14 text-sm">{props.dis}</p>
        </div>

        <div className="flex justify-center items-center gap-10">
          <p>24 Oct 2022</p>
          <div className="border cursor-pointer text-center p-2 rounded-md">
            <BsThreeDots className="text-xl text-blue-600" />
          </div>
        </div>
      </div>
    </>
  );
}
