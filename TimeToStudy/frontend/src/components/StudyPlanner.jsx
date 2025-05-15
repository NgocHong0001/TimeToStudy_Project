import React from 'react';
import '../styles/StudyPlanner.css';
const StudyPlanner = ({
  studyType, setStudyType, studyPace, setStudyPace, startDate, setStartDate, endDate, setEndDate, handleCalculateStudy, recommendedHours
}) => {
  return (
    <div className="study-planner">
  <h2>📚 Plan your Study hours</h2>
  <div className="study-form">
    <label>
          <span>Study type:</span>
          <input
          type="text"
          value={studyType}
          onChange={(e) => setStudyType(e.target.value)}
          placeholder="e.g. exam"
          />
      </label>
    <label>
      <span>Study pace (%)</span>
      <select value={studyPace} onChange={(e) => setStudyPace(Number(e.target.value))}>
        <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
      </select>
    </label>

    <label>
      <span>Start date:</span>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    </label>

    <label>
      <span>End date:</span>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </label>
  </div>



        <button className="calculate-button" onClick={handleCalculateStudy}>
          Calculate Study Plan
        </button>

        {recommendedHours && (
          <div className="mt-8 bg-gray-100 rounded-lg shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Abhaya Libre', serif" }}>
              Suggested daily study hours (weekdays)
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Note: this is a suggested plan. You may need more or fewer hours depending on your personal pace
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="px-6 py-3 bg-white text-black text-lg rounded-full shadow-sm border">
                    {recommendedHours}h / day
                    </div>
                  </div>
                </div>
              )}
      </div>
  );
};

export default StudyPlanner;
