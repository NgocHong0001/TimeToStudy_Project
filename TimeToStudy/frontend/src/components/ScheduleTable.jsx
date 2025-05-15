import React, { useState, useEffect } from 'react';

const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateStr).toLocaleDateString('en-GB', options);
};

const getDayOfWeek = (dateStr) => new Date(dateStr).getDay();
const getHour = (timeStr) => parseInt(timeStr.split(':')[0], 10);
const isSameWeek = (dateStr, currentWeekStartStr) => {
  const d1 = new Date(dateStr);
  const d2 = new Date(currentWeekStartStr);
  const dayDiff = Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
  return dayDiff >= 0 && dayDiff < 7;
};

// Simple EventBox components
const EventBox = ({ event }) => {
  const isImportant = ['assignment', 'test', 'seminar', 're-seminar', 'examination', 'exam', 're-exam']
    .some(keyword => event.summary.toLowerCase().includes(keyword));
  const isStudy = event.isStudySession;

  return (
    <div className={`event-box ${isStudy ? 'green-event' : isImportant ? 'red-event' : ''}`}>
      <div className="event-summary"><strong>{event.summary}</strong></div>
      <div className="event-time">{event.startTime} - {event.endTime}</div>
      <div className="event-location"><em>{event.location}</em></div>
    </div>
  );
};

const ScheduleTable = ({ events, studyEvents, currentWeekStart, weekDates, hours, days }) => {
  const [localStudyEvents, setLocalStudyEvents] = useState(studyEvents);

  useEffect(() => {
    setLocalStudyEvents(studyEvents);
  }, [studyEvents]);

  const handleStudyEventClick = (eventIndex) => {
  const event = localStudyEvents[eventIndex];
  const newStartTime = prompt("Enter new start time (HH:MM):", event.startTime);
  const newEndTime = prompt("Enter new end time (HH:MM):", event.endTime);

  if (!newStartTime && !newEndTime) return;

  setLocalStudyEvents(prev => {
    const updated = [...prev];
    const current = updated[eventIndex];

    // Only update if values actually changed
    updated[eventIndex] = {
      ...current,
      startTime: newStartTime || current.startTime,
      endTime: newEndTime || current.endTime,
    };

    return updated;
  });
};

  return (
    <div className="table-container desktop-only">
      <table className="schedule-table">
        <thead>
          <tr>
            <th className="header-time">Time</th>
            {weekDates.map((date, index) => (
              <th key={index} className="header-day">
                {days[index]}<br />
                <span className="date-text">{formatDate(date)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="time-column">{`${hour}:00`}</td>
              {days.map((_, dayIdx) => {
                const actualDay = (dayIdx + 1) % 7;

                return (
                  <td key={dayIdx} className="event-cell">
                    {[...events, ...localStudyEvents]
                      .filter(event => {
                        // Must be in the current week and match day and hour
                        if (!isSameWeek(event.startDate, currentWeekStart)) return false;
                        if (getDayOfWeek(event.startDate) !== actualDay) return false;
                        if (getHour(event.startTime) !== hour) return false;
                        // For study sessions, exclude weekends (dayIdx 0 = Sunday, 6 = Saturday)
                        if (event.isStudySession && (actualDay === 0 || actualDay === 6)) return false;

                        return true;
                      })
                      .map((event, idx) => {
                        const isStudy = event.isStudySession;
                        const studyIndex = isStudy
                          ? localStudyEvents.findIndex(e =>
                              e.startDate === event.startDate &&
                              e.startTime === event.startTime &&
                              e.endTime === event.endTime &&
                              e.summary === event.summary
                            )
                          : -1;

                        return (
                          <div
                            key={idx}
                            className="event-wrapper"
                            onClick={() => isStudy && handleStudyEventClick(studyIndex)}
                            style={{ cursor: isStudy ? 'pointer' : 'default' }}
                          >
                            <EventBox event={event} />
                          </div>
                        );
                      })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;