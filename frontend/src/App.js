import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Registration";
import SignIn from "./pages/SignIn";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Register, {}) }), _jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/payment", element: _jsx(Payment, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
