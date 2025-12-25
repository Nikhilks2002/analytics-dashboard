import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import WaveChart from "../components/WaveChart";
import DonutChart from "../components/DonutChart";
import { sadDataSample } from "../types";
import "../App.css";
/* ------------------ DATA CONSTANTS ------------------ */
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const generateHourlyData = () => HOURS.map((h) => ({ name: h, value: Math.floor(Math.random() * 10) }));
const generateDailyData = () => DAYS.map((d) => ({ name: d, value: Math.floor(Math.random() * 50) }));
const generateMonthlyData = () => MONTHS.map((m) => ({ name: m, value: Math.floor(Math.random() * 200) }));
/* ------------------ DASHBOARD ------------------ */
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const [timeRange, setTimeRange] = useState("day");
    const [callData, setCallData] = useState(generateDailyData());
    const [sadData, setSadData] = useState(sadDataSample);
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
        if (lastVisit && lastVisit === today)
            setShowWelcome(true);
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
            if (showChangeMessage)
                setShowChangeMessage(false);
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
    const handleTimeChange = (range) => {
        setTimeRange(range);
        if (range === "24h")
            setCallData(generateHourlyData());
        if (range === "day" || range === "week")
            setCallData(generateDailyData());
        if (range === "month")
            setCallData(generateMonthlyData());
    };
    /* -------- INPUT HANDLERS WITH TOAST -------- */
    const showChangeToast = () => {
        if (!hasConfirmed) {
            setTimeout(() => setShowChangeMessage(true), 500); // 0.5s delay
            setHasConfirmed(true);
        }
    };
    const handleCallDataChange = (idx, value) => {
        showChangeToast();
        setCallData((prev) => prev.map((d, i) => (i === idx ? { ...d, value } : d)));
    };
    const handleSadDataChange = (idx, value) => {
        showChangeToast();
        setSadData((prev) => prev.map((d, i) => (i === idx ? { ...d, value } : d)));
    };
    if (!user)
        return null;
    const initials = user.username?.slice(0, 2)?.toUpperCase() || "US";
    /* ------------------ UI ------------------ */
    return (_jsxs("div", { className: "dashboard-wrapper", children: [_jsxs("header", { className: "dashboard-header-fixed", children: [_jsxs("div", { className: "header-left", children: [user.avatar_url ? (_jsx("img", { src: user.avatar_url, className: "profile-avatar" })) : (_jsx("div", { className: "profile-avatar fallback", children: initials })), _jsx("span", { className: "profile-name", children: user.username })] }), _jsx("div", { className: "header-center", children: formattedDate() }), _jsx("button", { className: "logout-btn", onClick: () => {
                            localStorage.clear();
                            window.location.href = "/";
                        }, children: "Logout" })] }), showWelcome && (_jsxs("div", { className: "welcome-banner", children: ["\uD83D\uDC4B Welcome back, ", _jsx("strong", { children: user.username }), "! Glad to see you again."] })), showChangeMessage && (_jsxs("div", { className: "change-toast", children: ["Hey ", _jsx("strong", { children: user.username }), ", do you really want to make changes to the data?"] })), _jsxs("div", { className: "dashboard-container", children: [_jsxs("aside", { className: "sidebar", children: [_jsx("h3", { children: "Call Duration Inputs" }), callData.map((item, idx) => (_jsxs("div", { className: "input-row", children: [_jsx("label", { className: `animated-label ${showLabels ? "show" : ""}`, style: { transitionDelay: `${idx * 80}ms` }, children: item.name }), _jsx("input", { type: "number", value: item.value === 0 ? "" : item.value, onChange: (e) => handleCallDataChange(idx, +e.target.value), placeholder: "0" })] }, item.name))), _jsx("h3", { children: "SAD Path Inputs" }), sadData.map((item, idx) => (_jsxs("div", { className: "input-row", children: [_jsx("label", { className: `animated-label ${showLabels ? "show" : ""}`, style: { transitionDelay: `${idx * 80}ms` }, children: item.name }), _jsx("input", { type: "number", value: item.value === 0 ? "" : item.value, onChange: (e) => handleSadDataChange(idx, +e.target.value), placeholder: "0" })] }, item.name)))] }), _jsxs("main", { className: "charts-section", children: [_jsxs("div", { className: "chart-card", children: [_jsx("h3", { children: "Call Duration" }), _jsx("div", { className: "time-filter", children: ["24h", "day", "week", "month"].map((r) => (_jsx("button", { className: timeRange === r ? "active" : "", onClick: () => handleTimeChange(r), children: r.toUpperCase() }, r))) }), _jsx(WaveChart, { data: callData, color: "#22D3EE" })] }), _jsxs("div", { className: "chart-card", children: [_jsx("h3", { children: "SAD Path Analysis" }), _jsx(DonutChart, { data: sadData })] })] })] })] }));
};
export default Dashboard;
