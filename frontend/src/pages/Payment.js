import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../App.css";
export default function Payment() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState("select");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [bank, setBank] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [payeeName, setPayeeName] = useState(user?.username || "");
    const plans = [
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
            if (data)
                window.location.href = "/dashboard";
            else
                setTimeout(() => setLoading(false), 500);
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
    if (loading)
        return (_jsxs("div", { className: "auth-page fade-in", children: [_jsx("h2", { children: "Loading Payment Options..." }), _jsx("div", { className: "loader futuristic-loader" })] }));
    return (_jsxs("div", { className: "auth-page fade-in", children: [step === "select" && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "futuristic-heading", children: "Select Your Plan" }), _jsx("div", { className: "plans-grid futuristic-grid", children: plans.map((plan) => (_jsxs("div", { className: `plan-card futuristic-card ${selectedPlan?.id === plan.id ? "active" : ""}`, onClick: () => setSelectedPlan(plan), children: [_jsx("h3", { children: plan.name }), _jsxs("p", { className: "price", children: ["\u20B9", plan.price] }), selectedPlan?.id === plan.id && (_jsxs("ul", { className: "benefits-list futuristic-benefits", children: [plan.benefits.map((b, i) => (_jsx("li", { children: b }, i))), _jsxs("li", { children: ["Duration: ", plan.duration] })] }))] }, plan.id))) }), selectedPlan && (_jsxs("button", { className: "futuristic-btn", onClick: () => setStep("details"), children: ["Proceed to Payment - \u20B9", selectedPlan.price] }))] })), step === "details" && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "futuristic-heading", children: "Payment Details" }), _jsxs("p", { children: ["Plan: ", _jsx("strong", { children: selectedPlan?.name }), " - \u20B9", selectedPlan?.price] }), _jsx("input", { type: "text", placeholder: "Payee Name", value: payeeName, onChange: (e) => setPayeeName(e.target.value), className: "futuristic-input" }), _jsxs("select", { value: bank, onChange: (e) => setBank(e.target.value), className: "futuristic-input", children: [_jsx("option", { value: "", children: "Select Bank" }), _jsx("option", { value: "HDFC", children: "HDFC" }), _jsx("option", { value: "ICICI", children: "ICICI" }), _jsx("option", { value: "SBI", children: "SBI" }), _jsx("option", { value: "Axis", children: "Axis" })] }), _jsx("input", { type: "text", placeholder: "Enter Account No (dummy)", value: accountNo, onChange: (e) => setAccountNo(e.target.value), className: "futuristic-input" }), _jsx("button", { className: "futuristic-btn", onClick: handleProceed, children: "Proceed Payment" })] })), step === "processing" && (_jsxs("div", { children: [_jsx("h2", { children: "Processing Payment..." }), _jsx("div", { className: "loader futuristic-loader" })] })), step === "success" && (_jsxs("div", { children: [_jsx("h2", { children: "Payment Successful!" }), _jsx("p", { children: "Redirecting to dashboard..." })] }))] }));
}
