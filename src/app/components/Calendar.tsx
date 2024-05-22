"use client";

import {
  Calendar,
  EventPropGetter,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useMemo, useState } from "react";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Morning Shift",
    start: new Date(2024, 4, 1, 8, 0), // May 1st, 2024 at 8:00 AM
    end: new Date(2024, 4, 1, 16, 0), // May 1st, 2024 at 4:00 PM
  },
  {
    title: "Afternoon Shift",
    start: new Date(2024, 4, 2, 12, 0), // May 2nd, 2024 at 12:00 PM
    end: new Date(2024, 4, 2, 20, 0), // May 2nd, 2024 at 8:00 PM
  },
  {
    title: "Night Shift",
    start: new Date(2024, 4, 3, 20, 0), // May 3rd, 2024 at 8:00 PM
    end: new Date(2024, 4, 4, 4, 0), // May 4th, 2024 at 4:00 AM
  },
  // Add more events as needed
];

function MyCalendar() {
  // Toolbar not working when using nextjs on strict mode... Need to hanfle view and date state by ourselves
  // See fix: https://stackoverflow.com/questions/78011246/react-big-calendar-next-and-back-buttons-not-navigating-to-the-correct-month
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );
  const eventStyleGetter: EventPropGetter<any> = (
    event,
    start,
    end,
    isSelected
  ) => {
    const style = {
      backgroundColor: "teal",
      color: "white",
      borderRadius: "0px",
      border: "none",
    };
    return {
      style,
    };
  };

  const dayPropGetter = (date: Date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return {
      style: {
        backgroundColor: isToday ? "#E6FFFA" : "white",
      },
    };
  };

  // Event handler for toggling between month and week views
  const handleViewChange = (newView: any) => {
    if (newView === "month" || newView === "week") {
      setView(newView); // Update the view state
    }
  };

  return (
    <Calendar
      views={[Views.MONTH, Views.WEEK]}
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      date={date}
      view={view}
      defaultDate={defaultDate}
      eventPropGetter={eventStyleGetter}
      dayPropGetter={dayPropGetter}
      toolbar={true}
      onView={handleViewChange}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
    />
  );
}

export default MyCalendar;
