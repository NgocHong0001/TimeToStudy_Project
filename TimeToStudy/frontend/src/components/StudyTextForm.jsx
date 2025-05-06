import React from 'react';
import '../styles/StudyTextForm.css';

const StudyTextForm = () => {
  return (
    <div className="study-text-form">
      <h3 className="study-title">Study Tips:</h3>
      <p className="study-description">Here are some tips to help you plan your study schedule:</p>
      <ul className="study-tips">
        <li>Break your study sessions into manageable chunks.</li>
        <li>Take regular breaks to improve focus.</li>
        <li>Set realistic goals for each session.</li>
        <li>Stay consistent and track your progress.</li>
      </ul>
    </div>
  );
};

export default StudyTextForm;
