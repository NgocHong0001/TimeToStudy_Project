export function formatDate(date) {
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
}

export function getDayOfWeek(dateStr) {
  const date = new Date(dateStr);
  return (date.getDay() + 6) % 7;
}

export function getHour(timeStr) {
  const [hours] = timeStr.split(':');
  return parseInt(hours, 10);
}

export function isSameWeek(dateStr, weekStartDate) {
  const date = new Date(dateStr);
  const start = new Date(weekStartDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return date >= start && date < end;
}

export function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(date);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

export function getDatesOfWeek(start) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}
