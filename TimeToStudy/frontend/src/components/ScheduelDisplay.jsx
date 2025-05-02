import MobileSchedule from './MobileSchedule';
import ScheduleTable from './ScheduleTable';

export default function ScheduleDisplay({ events, studyEvents, days, weekDates, hours, currentWeekStart }) {
  if (events.length === 0 && studyEvents.length === 0) {
    return <p className="no-events-text">No events loaded yet.</p>;
  }

  return (
    <>
      <ScheduleTable
        events={events}
        studyEvents={studyEvents}
        days={days}
        weekDates={weekDates}
        hours={hours}
        currentWeekStart={currentWeekStart}
      />
      <MobileSchedule
        events={events}
        studyEvents={studyEvents}
        days={days}
        weekDates={weekDates}
        hours={hours}
        currentWeekStart={currentWeekStart}
      />
    </>
  );
}
