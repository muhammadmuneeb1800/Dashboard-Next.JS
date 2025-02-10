"use client";
import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-02-10" },
    { title: "Workshop", date: "2025-02-15" },
  ]);

  const handleDateClick = (info: any) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={false}
      dayHeaderClassNames="h-28"
      dayHeaderFormat={{ day: "2-digit", weekday: "short" }}
      initialView="timeGridWeek"
      selectable={true}
      events={events}
      editable={true}
      dateClick={handleDateClick}
      slotLabelFormat={{timeStyle: "short"}}
      height="auto"
      expandRows={true}
      eventMinHeight={120}
      eventMinWidth={120}
      contentHeight="auto"
      eventBackgroundColor="red"
      eventTextColor="white"
    />
  );
};

export default Calendar;

// "use client";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { useState } from "react";

// const Calendar = () => {
//   const [events, setEvents] = useState([
//     {
//       title: "Medical Appointment",
//       start: "2025-02-25T09:00:00",
//       end: "2025-02-25T09:45:00",
//       color: "red",
//     },
//     {
//       title: "General Clinic",
//       start: "2025-02-26T10:00:00",
//       end: "2025-02-26T10:45:00",
//       color: "blue",
//     },
//     {
//       title: "Medical Appointment",
//       start: "2025-02-27T09:00:00",
//       end: "2025-02-27T09:45:00",
//       color: "green",
//     },
//     {
//       title: "Medical Checkup",
//       start: "2025-02-28T11:00:00",
//       end: "2025-02-28T11:45:00",
//       color: "yellow",
//     },
//   ]);

// //   const handleDateClick = (info: any) => {
// //     const title = prompt("Enter event title:");
// //     if (title) {
// //       setEvents([...events, { title, date: info.dateStr }]);
// //     }
// //   };

//   return (
//     <FullCalendar
//       plugins={[timeGridPlugin]}
//       initialView="timeGridWeek"
//       selectable={true}
//       events={events}
//       editable={true}
//     //   dateClick={handleDateClick}
//       height="auto"
//     />
//   );
// };

// export default Calendar;
