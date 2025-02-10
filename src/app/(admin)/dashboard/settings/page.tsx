import { MdOutlineContactSupport } from "react-icons/md";


export default function Settings() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Settings</h1>
        <div className="flex justify-between items-center px-6 bg-white py-3 mt-5 rounded">
          <div>
            <p className="text-xl font-medium">
              Settings
            </p>
          </div>
            <div className="border cursor-pointer text-center p-3 rounded-md">
              <MdOutlineContactSupport className="text-xl" />
            </div>
        </div>
        </div>
    </>
  )
}
