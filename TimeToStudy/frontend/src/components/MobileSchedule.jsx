import React from 'react';
import { formatDate, getDayOfWeek, getHour, isSameWeek } from '../utils/scheduleUtils';
import EventBox from './EventBox';

const MobileSchedule = ({ events, studyEvents, currentWeekStart, weekDates, hours, days }) => {
  return (
    <div className="mobile-schedule mobile-only">
      {days.map((day, dayIdx) => (
        <div key={dayIdx} className="day-card">
          <h3>{day} - <span className="date-text">{formatDate(weekDates[dayIdx])}</span></h3>
          {hours.map((hour) => {
            const matchingEvents = [...events, ...studyEvents].filter(event =>
              isSameWeek(event.startDate, currentWeekStart) &&
              getDayOfWeek(event.startDate) === dayIdx &&
              getHour(event.startTime) === hour
            );

            return (
              <div key={hour} className="hour-block">
                <strong>{`${hour}:00`}</strong>
                {matchingEvents.length > 0 ? matchingEvents.map((event, idx) => (
                  <EventBox key={idx} event={event} />
                )) : <div className="no-events-text">No events</div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MobileSchedule;
