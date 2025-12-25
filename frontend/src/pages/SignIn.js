import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // for welcome/error
    const [showRegisterBtn, setShowRegisterBtn] = useState(false);
    const handleProceed = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
        setLoading(true);
        setMessage("");
        setShowRegisterBtn(false);
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();
            if (error || !data) {
                // No user found
                setMessage("No account found with this email.");
                setShowRegisterBtn(true);
            }
            else {
                // User exists → Welcome back
                setMessage(`Welcome back, ${data.username}! Redirecting...`);
                localStorage.setItem("user", JSON.stringify(data));
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }
        }
        catch (err) {
            alert(err.message || "Sign in failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "auth-page fade-in", children: [_jsx("h2", { className: "futuristic-heading", children: "Sign In" }), message ? (_jsx("p", { className: "futuristic-heading", children: message })) : (_jsxs("div", { className: "futuristic-form", children: [_jsx("input", { type: "email", placeholder: "Enter your registered email", value: email, onChange: (e) => setEmail(e.target.value), className: "futuristic-input" }), _jsx("button", { className: "futuristic-btn", onClick: handleProceed, disabled: loading, children: loading ? "Checking..." : "Proceed" })] })), showRegisterBtn && (_jsx("button", { className: "futuristic-btn", style: { marginTop: "15px" }, onClick: () => navigate("/"), children: "Go to Registration" }))] }));
}
