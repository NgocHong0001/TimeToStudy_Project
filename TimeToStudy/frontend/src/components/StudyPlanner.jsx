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
    </div>
  );
};

export default StudyPlanner;
