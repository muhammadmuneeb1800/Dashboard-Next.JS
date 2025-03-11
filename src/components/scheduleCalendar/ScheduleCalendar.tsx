"use client";
import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { LuUserRound } from "react-icons/lu";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { MdStickyNote2 } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { WiTime4 } from "react-icons/wi";
import moment from "moment";
import Loader from "../loader/Loader";

export default function ScheduleCalendar() {
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
  }, [dispatch]);

  return (
    <div className="p-4 overflow-x-auto h-screen overflow-y-auto bg-white shadow-lg rounded-xl">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader loading={isLoading} size={100} />
        </div>
      ) : (
        <div className="min-w-[1150px] mx-auto">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            dayCellClassNames={dayCellClassNames}
            dayMaxEventRows={1}
            aspectRatio={1.8}
            height="1000px"
            allDaySlot={false}
            headerToolbar={{
              left: "prev,next today",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            moreLinkClick="popover"
            events={appointments.map((event) => ({
              title: event.patientName as string,
              start: event.startDate as Date,
              end: event.endDate as Date,
              status: event.appointmentStatus,
              extendedProps: {
                name: event.patientName,
                appointmentType: event.appointmentType,
                purpose: event.purposeOfVisit,
                status: event.appointmentStatus,
                startDate: event.startDate,
                endDate: event.endDate,
              },
            }))}
            eventContent={({ event }) => {
              const start = moment(event.extendedProps.startDate).format(
                "h:mm"
              );
              const end = moment(event.extendedProps.endDate).format("h:mm");
              const isConfirmed = event.extendedProps.status === "Confirmed";
              return (
                <div
                  className={`rounded-md ${
                    isConfirmed
                      ? "bg-blue-300 text-blue-700"
                      : "bg-green-300 text-green-700"
                  } text-[14px]`}
                >
                  <p
                    className={`${
                      isConfirmed
                        ? "bg-blue-400 text-blue-800"
                        : "bg-green-400 text-green-800"
                    } p-1 rounded-t-md`}
                  >
                    {event.extendedProps.status}
                  </p>
                  <h3 className="px-2 flex items-center gap-2">
                    <LuUserRound />
                    {event.title}
                  </h3>
                  <p className="px-2 flex items-center gap-2">
                    <MdStickyNote2 className="rotate-180" />
                    {event.extendedProps.purpose}
                  </p>
                  <p className="px-2 flex items-center gap-2">
                    <WiTime4 />
                    {`${start} - ${end}`}
                  </p>
                  <p className="px-2 flex items-center gap-2">
                    <CiLocationOn />
                    General clinic
                  </p>
                </div>
              );
            }}
            selectable={true}
            timeZone="UTC"
          />
        </div>
      )}
    </div>
  );
}
