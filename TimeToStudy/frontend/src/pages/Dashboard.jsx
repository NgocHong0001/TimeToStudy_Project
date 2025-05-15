import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import authorizedFetch from '../utils/authFetch';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [today, setToday] = useState("");
  const [studyPlanner, setStudyPlanner] = useState(null);  

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

    // Get today's date
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
        console.log("Fetched study planner data:", data);
      } catch (error) {
        console.error("Error fetching study planner data:", error);
      }
    };

    fetchStudyPlanner();
  }, []);

  // Handle the deletion of the study planner notice
  const handleDeleteNotice = () => {
    setStudyPlanner(null);  
  };

  //Only for debug purpose for the refresh token,
  /*const refreshToken = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/refresh-token`, {
      method: 'POST', // eller POST beroende på din backend
      credentials: 'include' // 
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Got new access token:", data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      console.warn("Failed to refresh:", data.message);
    }
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
};*/


  return (
    <section className="dashboard-wrapper">
      <h1>Welcome {firstname} {lastname}!</h1>

      <div className="Date-table">
        <p className="Date-text">{today}</p>

        {/* Only display the study planner section */}
        {studyPlanner ? (
          <div className="study-planner-notice">
            <h3>Study Planner:</h3>
            <p>Study Type: {studyPlanner.studyType}</p>
            <p>Study Pace: {studyPlanner.studyPace}</p>
            <p>Start Date: {new Date(studyPlanner.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(studyPlanner.endDate).toLocaleDateString()}</p>
            <p>Recommended Hours: {studyPlanner.recommendedHours}</p>

            {/* Delete button */}
            <button className="delete-btn" onClick={handleDeleteNotice}>Delete Notice</button>
            {/*<button onClick={refreshToken}>Refresh Token</button>*/}

          </div>
        ) : (
          <p>No study planner data found.</p>
        )}
      </div>
    </section>
  );
}
