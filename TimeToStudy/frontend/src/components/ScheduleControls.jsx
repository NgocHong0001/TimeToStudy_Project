import { getStartOfWeek } from './utils/dateUtils';

export default function ScheduleControls({ currentWeekStart, setCurrentWeekStart }) {
  const previousWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(getStartOfWeek(prev));
  };

  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(getStartOfWeek(next));
  };

  return (
    <div className="week-controls">
      <button className="week-button" onClick={previousWeek}>⬅️ Previous Week</button>
      <button className="week-button" onClick={nextWeek}>Next Week ➡️</button>
    </div>
  );
}
