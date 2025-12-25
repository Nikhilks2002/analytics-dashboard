import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../App.css";

type Plan = {
  id: string;
  name: string;
  duration: string;
  price: number;
  benefits: string[];
};

export default function Payment() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"select" | "details" | "processing" | "success">("select");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [payeeName, setPayeeName] = useState(user?.username || "");

  const plans: Plan[] = [
    { id: "hour", name: "1 Hour Access", duration: "1 hour", price: 49, benefits: ["Limited Dashboard", "Basic Support"] },
    { id: "day", name: "1 Day Access", duration: "1 day", price: 99, benefits: ["Full Dashboard", "Email Support"] },
    { id: "month", name: "1 Month Access", duration: "1 month", price: 499, benefits: ["Full Dashboard", "Priority Support", "Weekly Reports"] },
    { id: "year", name: "1 Year Access", duration: "1 year", price: 4999, benefits: ["Full Dashboard", "Priority Support", "Monthly Reports", "VIP Features"] },
    { id: "lifetime", name: "Lifetime Access", duration: "Lifetime", price: 9999, benefits: ["All Features", "VIP Support", "All Future Updates"] },
  ];

  useEffect(() => {
    if (!user?.email) {
      window.location.href = "/";
      return;
    }

    const checkPayment = async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("id")
        .eq("email", user.email)
        .single();
      if (data) window.location.href = "/dashboard";
      else setTimeout(() => setLoading(false), 500);
    };
    checkPayment();
  }, []);

  const handleProceed = async () => {
    if (!bank || !accountNo || !payeeName) {
      alert("Please fill all fields");
      return;
    }

    setStep("processing");
    await new Promise((res) => setTimeout(res, 2000));

    const { error } = await supabase.from("payments").insert([
      {
        email: user.email,
        plan: selectedPlan?.name,
        amount: selectedPlan?.price,
        bank,
        account_no: accountNo,
        payee_name: payeeName,
      },
    ]);

    if (error) {
      console.error("Payment insert error:", error);
      alert("Payment failed. Check console for details.");
      setStep("details");
      return;
    }

    setStep("success");
    setTimeout(() => (window.location.href = "/dashboard"), 2000);
  };

  if (loading) return (
    <div className="auth-page fade-in">
      <h2>Loading Payment Options...</h2>
      <div className="loader futuristic-loader"></div>
    </div>
  );

  return (
    <div className="auth-page fade-in">
      {step === "select" && (
        <>
          <h2 className="futuristic-heading">Select Your Plan</h2>
          <div className="plans-grid futuristic-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card futuristic-card ${selectedPlan?.id === plan.id ? "active" : ""}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3>{plan.name}</h3>
                <p className="price">₹{plan.price}</p>
                {selectedPlan?.id === plan.id && (
                  <ul className="benefits-list futuristic-benefits">
                    {plan.benefits.map((b, i) => (<li key={i}>{b}</li>))}
                    <li>Duration: {plan.duration}</li>
                  </ul>
                )}
              </div>
            ))}
          </div>
          {selectedPlan && (
            <button className="futuristic-btn" onClick={() => setStep("details")}>
              Proceed to Payment - ₹{selectedPlan.price}
            </button>
          )}
        </>
      )}

      {step === "details" && (
        <>
          <h2 className="futuristic-heading">Payment Details</h2>
          <p>Plan: <strong>{selectedPlan?.name}</strong> - ₹{selectedPlan?.price}</p>

          <input
            type="text"
            placeholder="Payee Name"
            value={payeeName}
            onChange={(e) => setPayeeName(e.target.value)}
            className="futuristic-input"
          />

          <select value={bank} onChange={(e) => setBank(e.target.value)} className="futuristic-input">
            <option value="">Select Bank</option>
            <option value="HDFC">HDFC</option>
            <option value="ICICI">ICICI</option>
            <option value="SBI">SBI</option>
            <option value="Axis">Axis</option>
          </select>

          <input
            type="text"
            placeholder="Enter Account No (dummy)"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            className="futuristic-input"
          />

          <button className="futuristic-btn" onClick={handleProceed}>Proceed Payment</button>
        </>
      )}

      {step === "processing" && (
        <div>
          <h2>Processing Payment...</h2>
          <div className="loader futuristic-loader"></div>
        </div>
      )}

      {step === "success" && (
        <div>
          <h2>Payment Successful!</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}
