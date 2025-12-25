import React, { useEffect, useState } from "react";
import WaveChart from "../components/WaveChart";
import DonutChart from "../components/DonutChart";
import { ChartData, sadDataSample } from "../types";
import "../App.css";

/* ------------------ DATA CONSTANTS ------------------ */
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const generateHourlyData = (): ChartData[] =>
  HOURS.map((h) => ({ name: h, value: Math.floor(Math.random() * 10) }));

const generateDailyData = (): ChartData[] =>
  DAYS.map((d) => ({ name: d, value: Math.floor(Math.random() * 50) }));

const generateMonthlyData = (): ChartData[] =>
  MONTHS.map((m) => ({ name: m, value: Math.floor(Math.random() * 200) }));

/* ------------------ DASHBOARD ------------------ */
const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [timeRange, setTimeRange] = useState<"24h" | "day" | "week" | "month">("day");
  const [callData, setCallData] = useState<ChartData[]>(generateDailyData());
  const [sadData, setSadData] = useState<ChartData[]>(sadDataSample);
  const [showLabels, setShowLabels] = useState(false);

  // Toast message state
  const [showChangeMessage, setShowChangeMessage] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  /* -------- AUTH + WELCOME LOGIC -------- */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser?.email) {
      window.location.href = "/";
      return;
    }

    setUser(storedUser);
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("lastVisit");

    if (lastVisit && lastVisit === today) setShowWelcome(true);
    localStorage.setItem("lastVisit", today);
  }, []);

  /* -------- LABEL ANIMATION -------- */
  useEffect(() => {
    setShowLabels(false);
    const t = setTimeout(() => setShowLabels(true), 300);
    return () => clearTimeout(t);
  }, [timeRange]);

  /* -------- DISMISS TOAST ON CLICK ANYWHERE -------- */
  useEffect(() => {
    const handleClick = () => {
      if (showChangeMessage) setShowChangeMessage(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showChangeMessage]);

  /* -------- DATE FORMAT -------- */
  const formattedDate = () => {
    const d = new Date();
    return `${d.getDate()}-${MONTHS[d.getMonth()].toUpperCase()}-${d.getFullYear()}`;
  };

  /* -------- TIME RANGE CHANGE -------- */
  const handleTimeChange = (range: "24h" | "day" | "week" | "month") => {
    setTimeRange(range);
    if (range === "24h") setCallData(generateHourlyData());
    if (range === "day" || range === "week") setCallData(generateDailyData());
    if (range === "month") setCallData(generateMonthlyData());
  };

  /* -------- INPUT HANDLERS WITH TOAST -------- */
  const showChangeToast = () => {
    if (!hasConfirmed) {
      setTimeout(() => setShowChangeMessage(true), 500); // 0.5s delay
      setHasConfirmed(true);
    }
  };

  const handleCallDataChange = (idx: number, value: number) => {
    showChangeToast();
    setCallData((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, value } : d))
    );
  };

  const handleSadDataChange = (idx: number, value: number) => {
    showChangeToast();
    setSadData((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, value } : d))
    );
  };

  if (!user) return null;
  const initials = user.username?.slice(0, 2)?.toUpperCase() || "US";

  /* ------------------ UI ------------------ */
  return (
    <div className="dashboard-wrapper">
      {/* ===== FIXED HEADER ===== */}
      <header className="dashboard-header-fixed">
        <div className="header-left">
          {user.avatar_url ? (
            <img src={user.avatar_url} className="profile-avatar" />
          ) : (
            <div className="profile-avatar fallback">{initials}</div>
          )}
          <span className="profile-name">{user.username}</span>
        </div>
        <div className="header-center">{formattedDate()}</div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </header>

      {/* ===== WELCOME MESSAGE ===== */}
      {showWelcome && (
        <div className="welcome-banner">
          👋 Welcome back, <strong>{user.username}</strong>!  
          Glad to see you again.
        </div>
      )}

      {/* ===== CHANGE TOAST MESSAGE ===== */}
      {showChangeMessage && (
        <div className="change-toast">
          Hey <strong>{user.username}</strong>, do you really want to make changes to the data?
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="dashboard-container">
        <aside className="sidebar">
          <h3>Call Duration Inputs</h3>
          {callData.map((item, idx) => (
            <div className="input-row" key={item.name}>
              <label
                className={`animated-label ${showLabels ? "show" : ""}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {item.name}
              </label>
              <input
                type="number"
                value={item.value === 0 ? "" : item.value}
                onChange={(e) => handleCallDataChange(idx, +e.target.value)}
                placeholder="0"
              />
            </div>
          ))}

          <h3>SAD Path Inputs</h3>
          {sadData.map((item, idx) => (
            <div className="input-row" key={item.name}>
              <label
                className={`animated-label ${showLabels ? "show" : ""}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {item.name}
              </label>
              <input
                type="number"
                value={item.value === 0 ? "" : item.value}
                onChange={(e) => handleSadDataChange(idx, +e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </aside>

        <main className="charts-section">
          <div className="chart-card">
            <h3>Call Duration</h3>
            <div className="time-filter">
              {["24h", "day", "week", "month"].map((r) => (
                <button
                  key={r}
                  className={timeRange === r ? "active" : ""}
                  onClick={() => handleTimeChange(r as any)}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
            <WaveChart data={callData} color="#22D3EE" />
          </div>

          <div className="chart-card">
            <h3>SAD Path Analysis</h3>
            <DonutChart data={sadData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
