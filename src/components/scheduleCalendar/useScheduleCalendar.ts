import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useRef } from "react";

export default function useScheduleCalendar() {
  const { appointments, isLoading } =
    useAppSelector((store) => store.appointmentSlice) || [];
  const calendarRef = useRef<FullCalendar | null>(null);
  const dispatch = useAppDispatch();
  const dayCellClassNames = () => {
    return [
      "fc-daygrid-day,fc-daygrid-body,calendar-container,fc-toolbar,fc-more,fc-popover-body ,fc-event ",
    ];
  };
  useEffect(() => {
    dispatch(fetchAppointments());
    if (calendarRef.current) {
      calendarRef.current.getApi();
    }
  }, []);
  return {
    appointments,
    isLoading,
    calendarRef,
    dayCellClassNames,
  };
}
