"use client";

import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAppointments } from "@/store/slices/appointmentSlice";

export default function Calendar() {
  const all =
    useAppSelector((store) => store.appointmentSlice.appointments) || [];
  const calendarRef = useRef(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAppointments());
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.render();
    }
  }, [dispatch]);

  return (
    <div className="w-full overflow-auto rounded-lg shadow-md">
      <div className="w-full p-4 bg-white shadow-lg rounded-lg">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={all?.map((event) => ({
            title: event?.patientName as string,
            start: event?.startDate as Date,
            end: event?.endDate as Date,
            status: event?.appointmentStatus,
            extendedProps: {
              name: event?.patientName,
              appointmentType: event?.appointmentType,
              purpose: event?.purposeOfVisit,
              status: event?.appointmentStatus,
            },
          }))}
          eventContent={({ event }) => {
            return (
              <div className={`p-2 rounded-md ${event} shadow`}>
                <h3 className="">{event.title}</h3>
                <p>{event.extendedProps.purpose}</p>
                <p>{event.extendedProps.status}</p>
              </div>
            );
          }}
          dayMaxEventRows={1}
          selectable={true}
          timeZone="UTC"
        />
      </div>
    </div>
  );
}
