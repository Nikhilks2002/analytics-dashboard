import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Registration";
import SignIn from "./pages/SignIn";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
