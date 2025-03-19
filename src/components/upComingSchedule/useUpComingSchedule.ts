import { deleteAppointments, updateApp } from "@/store/slices/appointmentSlice";
import { useAppDispatch } from "@/store/store";
import { initialAppointment } from "@/types/types";
import moment from "moment";
import { useState } from "react";
import { showToast } from "../toast/Toast";

export default function useUpComingSchedule(
  initialAppointment: initialAppointment,
  close: () => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const start = moment(initialAppointment?.startDate)?.format("hh:mm");
  const end = moment(initialAppointment?.endDate)?.format("hh:mm");

  const hanleDeleteAppointment = async () => {
    try {
      await dispatch(deleteAppointments(initialAppointment?.id as string));
      setIsOpen(!isOpen);
      showToast("success", "Delete Appointments successfully");
    } catch (error) {
      showToast("error", "Delete Appointments failed");
      console.error("Error deleting appointment:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateApp(initialAppointment));
      setIsOpen(!isOpen);
      close();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    setIsOpen,
    dispatch,
    start,
    end,
    handleOpenModal,
    handleUpdate,
    hanleDeleteAppointment,
  };
}
