import React from 'react';

const StudyPlanner = ({
  studyType, setStudyType, studyPace, setStudyPace, startDate, setStartDate, endDate, setEndDate, handleCalculateStudy, recommendedHours
}) => {
  return (
    <div className="study-planner">
      <h2>📚 Plan your Study hours</h2>
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
  );
};

export default StudyPlanner;
