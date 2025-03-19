import { useAppSelector } from "@/store/store";
import { useState } from "react";

export default function useMainSchedules() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { appointments, isLoading } =
    useAppSelector((store) => store.appointmentSlice) || [];
  const close = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    appointments,
    isLoading,
    close,
  };
}
