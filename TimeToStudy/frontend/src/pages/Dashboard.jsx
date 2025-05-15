import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import authorizedFetch from '../utils/authFetch';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [today, setToday] = useState("");
  const [studyPlanner, setStudyPlanner] = useState(null);  
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFirstname(decoded.firstname || "");
        setLastname(decoded.lastname || "");
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }

    const date = new Date();
    const formatted = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    setToday(formatted);

    const fetchStudyPlanner = async () => {
      try {
        const response = await authorizedFetch(`${import.meta.env.VITE_API_URL}/users-planner`);

        if (!response.ok) {
          throw new Error("Failed to fetch study planner data");
        }

        const data = await response.json();
        setStudyPlanner(data);
      } catch (error) {
        console.error("Error fetching study planner data:", error);
      }
    };

    fetchStudyPlanner();
  }, []);

  const handleDeleteNotice = () => {
    setStudyPlanner(null);  
  };

  const toggleEvents = () => {
    setShowEvents(prev => !prev);
  };

  return (
    <>
      <section className="dashboard-wrapper">
        <h1>Welcome {firstname} {lastname}!</h1>
      </section>

      <section className="dashboard-sections">
        <div className="Date-table">
          <p className="Date-text">{today}</p>
        </div>

        <div className="dashboard-box">
          {studyPlanner ? (
            <div className="study-planner-notice">
  <h3>{studyPlanner.studyType}</h3>
  <p>Pace: {studyPlanner.studyPace} %</p>
  <p>End Date: {new Date(studyPlanner.endDate).toLocaleDateString()}</p>
  <p>Recommended Hours: {studyPlanner.recommendedHours}</p>
  <p>Study Events ({studyPlanner.studyEvents.length})</p>

  {/* Event count + Toggle button grouped */}
  

  {/* Show study events */}
  <div className={`study-events-list ${showEvents ? "open" : ""}`}>
    <ul>
      {studyPlanner.studyEvents.map((event, index) => (
        <li key={index}>
          <strong>{event.summary}</strong><br />
          Location: {event.location}<br />
          Start: {new Date(event.startDate).toLocaleDateString()} {event.startTime}<br />
          End: {event.endTime}
        </li>
      ))}
    </ul>
  </div>

  {/* Delete button separated below */}
    <div className="button-group">
    <button className="toggle-btn" onClick={toggleEvents}>
      {showEvents ? "Hide Events" : "Show Events"}
    </button>
    <button className="delete-btn" onClick={handleDeleteNotice}>
      Delete Notice
    </button>
  </div>

</div>

          ) : (
            <p>No study planner data found.</p>
          )}
        </div>
      </section>
    </>
  );
}
