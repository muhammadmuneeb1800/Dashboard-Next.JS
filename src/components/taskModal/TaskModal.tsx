import React from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useAddTask from "@/hooks/useAddTask";
import { resetUpdateTaskId } from "@/store/slices/taskSlice";
export default function TaskModal({ close }: { close: () => void }) {
  const {
    title,
    setTitle,
    des,
    setDes,
    status,
    setStatus,
    handleSave,
    handleUpdateTask,
    dispatch,
    isLoading,
    clearTask,
    update,
  } = useAddTask(close);
  return (
    <>
      <div className="fixed flex justify-center inset-0 z-50 items-center h-screen w-full bg-black backdrop-blur bg-opacity-40">
        <form
          onSubmit={(e: React.FormEvent) => {
            if (update === null) {
              handleSave(e);
            } else {
              handleUpdateTask(e, update?.id as string);
            }
          }}
          className="mx-auto w-[85%] md:w-[65%] lg:w-[50%] p-7 bg-white z-50 rounded-md shadow-md"
        >
          <h2 className="text-center text-xl font-semibold">
            {update === null ? "Add Task" : "Update Task"}
          </h2>
          <div className="mt-5">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              placeholder="Enter title"
              border="border-b"
              borderColor="border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="dis">Description</label>
            <Input
              id="dis"
              placeholder="Enter Description"
              border="border-b"
              borderColor="border-black"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="status">Status</label>
            <br />
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-b bg-white py-2 focus:border-b border-black mt-1 focus:outline-none"
            >
              <option value="NOT_COMPLETED">NOT_COMPLETED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div className="flex justify-center items-center gap-5 my-7">
            <div className="text-center">
              <Button
                text="Cencel"
                bg="bg-red-600"
                color="text-white"
                hBg="bg-white"
                hColor="text-red"
                type="button"
                onClick={() => {
                  close();
                  clearTask();
                  dispatch(resetUpdateTaskId());
                }}
              />
            </div>
            <div>
              {isLoading ? (
                <Button
                  text={update !== null ? "Update..." : "Add..."}
                  type="button"
                  bg="bg-gray-400"
                  color="text-white"
                  hBg="bg-gray-400"
                  hColor="text-white"
                  width="w-28"
                />
              ) : (
                <Button
                  text={update !== null ? "Update" : "Add"}
                  type="submit"
                  bg="bg-primary"
                  color="text-white"
                  hBg="bg-white"
                  hColor="text-red"
                  width="w-28"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
