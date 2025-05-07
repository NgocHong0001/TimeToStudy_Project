import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFirstname(decoded.firstname || "");
        setLastname(decoded.lastname || "");
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }

    // Get today's date"
    const date = new Date();
    const formatted = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    setToday(formatted);
  }, []);

 
  return (
    <section className="dashboard-wrapper">
      <h1>Welcome {firstname} {lastname}!</h1>

      <div className="Date-table">
        <p className="Date-text">{today}</p>

        <div className="Notice-table">
          <p>Notis</p>
        </div>

        <div className="Notice-table">
          <p>Notis</p>
        </div>
      </div>

      
    </section>
  );
}