import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterForm from './pages/Register';
import './styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';


function RouterWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="app" element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default RouterWrapper;
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

  const hours = Array.from({ length: 13 }, (_, i) => i + 8);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
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

  const handleGetICSData = async () => {
    try {
      const response = await fetch(`/api/ics?file=${selectedFile}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching ICS data:', error);
    }
  };

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

        if (endHour > 22) break;

        newStudyEvents.push({
          summary: `Study Session (${studyType})`,
          location: 'Home or Library',
          startDate: sessionDate.toISOString().split('T')[0],
          endDate: sessionDate.toISOString().split('T')[0],
          startTime: startTimeStr,
          endTime: endTimeStr,
          isStudySession: true
        });

        hoursLeftToday -= studyHours;
        currentHour = endHour;
        if (Math.random() < 0.5) currentHour += 1;
      }
    }

    setStudyEvents(newStudyEvents);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📅 My KronoX Schedule</h1>

      {/* Study planner form */}
      <div className="study-form">
        <label>
          Study type:
          <select value={studyType} onChange={(e) => setStudyType(e.target.value)}>
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
            <option value="seminar">Seminar</option>
            <option value="lab">Lab</option>
          </select>
        </label>
        <label>
          Study pace:
          <select value={studyPace} onChange={(e) => setStudyPace(Number(e.target.value))}>
            <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
          </select>
        </label>
        <label>
          Start:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleCalculateStudy}>Calculate</button>
        {recommendedHours && <p>You should study {recommendedHours} hours/day</p>}
      </div>

      <div className="file-selector">
        <label>Schedule:</label>
        <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
          <option value="file.ics">DataSystemUtveckling</option>
          <option value="filen.ics">SjukvårdsProgrammet</option>
        </select>
        <button onClick={handleGetICSData}>Load Events</button>
      </div>

      <div>
        <button onClick={previousWeek}>⬅️</button>
        <span>
          {currentWeekStart.toLocaleString('default', { month: 'long' })} – Week {getWeekNumber(currentWeekStart)}
        </span>
        <button onClick={nextWeek}>➡️</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day, i) => (
              <th key={i}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {days.map((_, dayIdx) => (
                <td key={dayIdx}>
                  {[...events, ...studyEvents]
                    .filter(event =>
                      isSameWeek(event.startDate, currentWeekStart) &&
                      getDayOfWeek(event.startDate) === dayIdx &&
                      getHour(event.startTime) === hour
                    )
                    .map((event, idx) => (
                      <div key={idx}>
                        <strong>{event.summary}</strong><br />
                        {event.startTime} - {event.endTime}<br />
                        📍 {event.location}
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

