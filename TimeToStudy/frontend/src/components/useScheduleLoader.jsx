import { useState } from 'react';

export function useScheduleLoader() {
  const [events, setEvents] = useState([]);

  const loadSchedule = async (file) => {
    try {
      const response = await fetch(`/api/ics?file=${file}`);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load .ics file", err);
    }
  };

  return { events, loadSchedule };
}
