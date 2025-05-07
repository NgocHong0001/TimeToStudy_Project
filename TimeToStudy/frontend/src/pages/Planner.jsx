import React, { useState, useEffect } from 'react';
import StudyPlanner from '../components/StudyPlanner';  
import FileSelector from '../components/FileSelector'; //This files works as expected, but the system thinks you have type error.
import ScheduleTable from '../components/ScheduleTable';
import MobileSchedule from '../components/MobileSchedule';
import StudyTextForm from '../components/StudyTextForm';
import { getStartOfWeek, getDatesOfWeek, getWeekNumber } from '../utils/scheduleUtils'; 
import '../styles/schedules.css';

const hours = Array.from({ length: 13 }, (_, i) => i + 8);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function School_sch() {
  // State
  const [school, setSchool] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [events, setEvents] = useState([]);
  const [studyEvents, setStudyEvents] = useState([]); 
  const [selectedFile, setSelectedFile] = useState(''); 
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [studyType, setStudyType] = useState('exam'); // set it for you
  const [studyPace, setStudyPace] = useState(100); // set it for you
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recommendedHours, setRecommendedHours] = useState(null);


  

  // Get ICS data
  const handleGetICSData = async (file) => {
    try {
      const response = await fetch(`/api/ics?file=${file}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to load schedule. Please check your selection.');
        return;
      }
  
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching .ics data:', error);
      alert('An unexpected error occurred while loading your schedule.');
    }
  };
  

  // Navigation functions
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

  const weekDates = getDatesOfWeek(currentWeekStart);

  // Study Planner Calculation
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
  
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
    // Determine total study hours based on pace
    const hoursPerWeek = studyPace === 100 ? 40 : studyPace === 75 ? 30 : 20;
    const totalWeeks = Math.ceil(totalDays / 7);
    const totalStudyHours = totalWeeks * hoursPerWeek;
  
    // Determine which days user selected to study (weekdays)
    const availableDates = [];
    for (let i = 0; i < totalDays; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      availableDates.push(day);
    }
  
    const totalAvailableDays = availableDates.length;
    const hoursPerDay = Math.min(12, Math.ceil(totalStudyHours / totalAvailableDays));


  
    const newStudyEvents = [];
  
    for (let i = 0; i < totalAvailableDays; i++) {
      const sessionDate = availableDates[i];
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
  
    setRecommendedHours(hoursPerDay);
    setStudyEvents(newStudyEvents);
  };
  
  

  return (
    <div className="app-container">
      <h1 className="app-title"> My Schedule</h1>
      {/* Study Planner */}
      <StudyPlanner
        {...{
          studyType,
          setStudyType,
          studyPace,
          setStudyPace,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          handleCalculateStudy,
          recommendedHours
        }}
      />
      {/* Container for both StudyTextForm and FileSelector */}
      <div className="study-and-file-selector-container">
        {/* File Selector */}
        <FileSelector
        {...{
          school,
          setSchool,
          program,
          setProgram,
          year,
          setYear,
          handleGetICSData
    }}/>{/* Study Text Form */} 
    <StudyTextForm /> 

 
</div>

      
      {/* Week Navigation */}
      <div className="month-week">
        {currentWeekStart.toLocaleString('default', { month: 'long' })} {currentWeekStart.getFullYear()} — Week {getWeekNumber(currentWeekStart)}
      </div>
      {/* Week Controls */}
      <div className="week-controls">
        <button className="week-button" onClick={previousWeek}>⬅️ Previous Week</button>
        <button className="week-button" onClick={nextWeek}>Next Week ➡️</button>
      </div>
      {/* Schedule Table */}
      {events.length > 0 || studyEvents.length > 0 ? (
        <>
          <ScheduleTable {...{ events, studyEvents, currentWeekStart, weekDates, hours, days }} />
          <MobileSchedule {...{ events, studyEvents, currentWeekStart, weekDates, hours, days }} />
        </>
      ) : (
        <p className="no-events-text">No events loaded yet.</p>
      )}
    </div>
  );
}

export default School_sch;
