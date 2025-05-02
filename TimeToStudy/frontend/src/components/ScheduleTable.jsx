import React from 'react';
import { formatDate, getDayOfWeek, isSameWeek, getHour } from '../utils/scheduleUtils';
import EventBox from './EventBox';

const ScheduleTable = ({ events, studyEvents, currentWeekStart, weekDates, hours, days }) => {
  return (
    <div className="table-container desktop-only">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            {weekDates.map((date, index) => (
              <th key={index}>
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
              {days.map((_, dayIdx) => (
                <td key={dayIdx} className="event-cell">
                  {[...events, ...studyEvents]
                    .filter(event =>
                      isSameWeek(event.startDate, currentWeekStart) &&
                      getDayOfWeek(event.startDate) === dayIdx &&
                      getHour(event.startTime) === hour
                    )
                    .map((event, idx) => (
                      <EventBox key={idx} event={event} />
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
