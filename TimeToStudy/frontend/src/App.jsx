import { useState } from 'react';
import './App.css';

const hours = Array.from({ length: 13 }, (_, i) => i + 8);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function App() {
  const [events, setEvents] = useState([]);
  const [studyEvents, setStudyEvents] = useState([]); 
  const [selectedFile, setSelectedFile] = useState('file.ics');
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  const [studyType, setStudyType] = useState('exam');
  const [studyPace, setStudyPace] = useState(100);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recommendedHours, setRecommendedHours] = useState(null);

  const handleGetICSData = async () => {
    try {
      const response = await fetch(`/api/ics?file=${selectedFile}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching ICS data:', error);
    }
  };

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(date);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    return (date.getDay() + 6) % 7;
  }

  function getHour(timeStr) {
    const [hours] = timeStr.split(':');
    return parseInt(hours, 10);
  }

  function isSameWeek(dateStr, weekStartDate) {
    const date = new Date(dateStr);
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return date >= start && date < end;
  }

  function formatDate(date) {
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
  }

  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  }
  
  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(getStartOfWeek(next));
  };

  const previousWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(getStartOfWeek(prev));
  };

  const getDatesOfWeek = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const weekDates = getDatesOfWeek(currentWeekStart);
  const handleCalculateStudy = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates!');
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > end) {
      alert('Start date must be before end date!');
      return;
    }
  
    const filteredEvents = events.filter(event =>
      event.summary.toLowerCase().includes(studyType.toLowerCase())
    );
  
    if (filteredEvents.length === 0) {
      alert('No events found matching your study type.');
      return;
    }
  
    const totalBaseHours = filteredEvents.length * 10;
    const adjustedHours = (totalBaseHours * studyPace) / 100;
    const daysBetween = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const hoursPerDay = Math.ceil(adjustedHours / daysBetween);
    setRecommendedHours(hoursPerDay);
    const newStudyEvents = [];
  
    for (let i = 0; i < daysBetween; i++) {
      const sessionDate = new Date(start);
      sessionDate.setDate(sessionDate.getDate() + i);
  
      let hoursLeftToday = hoursPerDay;
      let currentHour = 8; 
  
      while (hoursLeftToday > 0) {
        const maxSession = Math.min(3, hoursLeftToday);
        const sessionLength = Math.random() < 0.5 ? 1 : (Math.random() < 0.5 ? 2 : 3);
        const studyHours = Math.min(sessionLength, maxSession);
  
        const startTimeStr = `${String(currentHour).padStart(2, '0')}:00`;
        let endHour = currentHour + studyHours;
        const endTimeStr = `${String(endHour).padStart(2, '0')}:00`;
  
        if (endHour > 22) {
          break;
        }
  
        const studyEvent = {
          summary: `Study Session (${studyType})`,
          location: 'Home or Library',
          startDate: sessionDate.toISOString().split('T')[0],
          endDate: sessionDate.toISOString().split('T')[0],
          startTime: startTimeStr,
          endTime: endTimeStr,
          isStudySession: true
        };
  
        newStudyEvents.push(studyEvent);
  
        hoursLeftToday -= studyHours;
        currentHour = endHour;

        if (Math.random() < 0.5) {
          currentHour += 1; 
        }
      }
    }
    setStudyEvents(newStudyEvents);
  };
  
  return (
    <div className="app-container">
      <h1 className="app-title">📅 My KronoX Schedule</h1>
      {/* Study Planner */}
      <div className="study-planner">
        <h2>📚 Study Planner</h2>

        <div className="study-form">
          <label>
            Select what you want to study:
            <select value={studyType} onChange={(e) => setStudyType(e.target.value)}>
              <option value="exam">Exam</option>
              <option value="assignment">Assignment</option>
              <option value="seminar">Seminar</option>
              <option value="lab">Lab</option>
            </select>
          </label>

          <label>
            Select study pace (%):
            <select value={studyPace} onChange={(e) => setStudyPace(Number(e.target.value))}>
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
            </select>
          </label>

          <label>
            Study from (start date):
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>

          <label>
            Study until (end date):
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>

          <button className="calculate-button" onClick={handleCalculateStudy}>
            Calculate Study Plan
          </button>

          {recommendedHours && (
            <div className="study-result">
              📖 You should study approximately <strong>{recommendedHours}</strong> hours per day during this period.
            </div>
          )}
        </div>
      </div>

      <div className="file-selector">
        <label htmlFor="fileSelect">Select schedule </label>
        <select
          id="fileSelect"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="file.ics">DataSystemUtvecklignprogrammet</option>
          <option value="filen.ics">SjukvårdsProgrammet </option>
        </select>
      </div>

      <button className="load-button" onClick={handleGetICSData}>
        Load Events
      </button>
      
      <div className="month-week">
        {currentWeekStart.toLocaleString('default', { month: 'long' })} {currentWeekStart.getFullYear()} — Week {getWeekNumber(currentWeekStart)}
      </div>

      <div className="week-controls">
        <button className="week-button" onClick={previousWeek}>⬅️ Previous Week</button>
        <button className="week-button" onClick={nextWeek}>Next Week ➡️</button>
      </div>

      {events.length > 0 || studyEvents.length > 0 ? (
        <div className="table-container">
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
                        .map((event, idx) => {
                          const isImportant = ['assignment', 'test', 'seminar', 're-seminar' , 'examination' ,'exam','re-exam']
                            .some(keyword => event.summary.toLowerCase().includes(keyword));
                          const isStudy = event.isStudySession;

                          return (
                            <div
                              key={idx}
                              className={`event-box ${
                                isStudy ? 'green-event': isImportant ? 'red-event' : ''
                              }`}
                            >
                              <div className="event-summary">{event.summary}</div>
                              <div className="event-details">
                                📍 {event.location}<br />
                                🕒 {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          );
                        })
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-events-text">No events loaded yet.</p>
      )}
    </div>
  );
}
export default App;
