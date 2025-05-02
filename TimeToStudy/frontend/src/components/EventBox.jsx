import React from 'react';

const EventBox = ({ event }) => {
  const isImportant = ['assignment', 'test', 'seminar', 're-seminar', 'examination', 'exam', 're-exam']
    .some(keyword => event.summary.toLowerCase().includes(keyword));
  const isStudy = event.isStudySession;

  return (
    <div
      className={`event-box ${isStudy ? 'green-event' : isImportant ? 'red-event' : ''}`}
    >
      <div className="event-summary">{event.summary}</div>
      <div className="event-details">
        📍 {event.location}<br />
        🕒 {event.startTime} - {event.endTime}
      </div>
    </div>
  );
};

export default EventBox;
