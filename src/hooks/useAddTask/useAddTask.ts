import { showToast } from "@/components/toast/Toast";
import { addTasks } from "@/store/slices/taskSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useAddTask(close: () => void) {
  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [status, setStatus] = useState<string>("NOT_COMPLETED");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required");
      return;
    }
    if (!des) {
      alert("Description is required");
      return;
    }
    if (!status) {
      alert("Status is required");
      return;
    }

    const data = {
      doctorId: session?.user.id,
      title: title,
      description: des,
      status: status,
    };

    try {
      await dispatch(addTasks(data));
      close();
      showToast("success", "Task added successfully");
    } catch (error) {
      showToast("error", error as string);
    }
  };

  return {
    title,
    setTitle,
    des,
    setDes,
    status,
    setStatus,
    handleSave,
  };
}
