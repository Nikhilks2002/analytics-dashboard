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
      } else {
        // User exists → Welcome back
        setMessage(`Welcome back, ${data.username}! Redirecting...`);
        localStorage.setItem("user", JSON.stringify(data));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      alert(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <h2 className="futuristic-heading">Sign In</h2>

      {message ? (
        <p className="futuristic-heading">{message}</p>
      ) : (
        <div className="futuristic-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="futuristic-input"
          />

          <button
            className="futuristic-btn"
            onClick={handleProceed}
            disabled={loading}
          >
            {loading ? "Checking..." : "Proceed"}
          </button>
        </div>
      )}

      {showRegisterBtn && (
        <button
          className="futuristic-btn"
          style={{ marginTop: "15px" }}
          onClick={() => navigate("/")}
        >
          Go to Registration
        </button>
      )}
    </div>
  );
}
