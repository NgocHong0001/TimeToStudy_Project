
import React from 'react';
import '../styles/StudyTextForm.css';

const StudyTextForm = () => {
  return (
    <div className="study-text-form">
      <h3 className="study-title">Understanding Study Pace</h3>
      <p className="study-text">
        If you’re studying full-time, your expected study load is based on the following paces:
      </p>
      <ul className="study-tips">
        <li>100% pace → 40 hours/week</li>
        <li>75% pace → 30 hours/week</li>
        <li>50% pace → 20 hours/week</li>
      </ul>
      <p className="study-text">
        If you miss the first few days of the week, don’t panic. You can still catch up by distributing the remaining study hours across your available days.
      </p>
      <p className="study-text">
        🔁 <strong>Example:</strong> If you're studying at 100% pace (40 hours/week) but you miss the first 3 days, you have 4 days left. That means you should aim for 10 hours per day to stay on track.
      </p>
      <p className="study-text">
        👉 The fewer days you study, the more time you’ll need to commit each day. Planning ahead helps you avoid falling behind and keeps you in control of your time.
      </p>
    </div>
  );
};

export default StudyTextForm;
