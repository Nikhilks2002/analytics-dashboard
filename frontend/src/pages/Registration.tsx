import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !username) {
      alert("Email and username are required");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert("User already exists. Please sign in.");
        navigate("/signin");
        return;
      }

      // 2️⃣ Upload avatar if provided
      let avatar_url: string | null = null;
      if (image) {
        const ext = image.name.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, image, {
            cacheControl: "3600",
            upsert: false,
            contentType: image.type,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        avatar_url = data.publicUrl;
      }

      // 3️⃣ Insert user into Supabase
      const { error: insertError, data } = await supabase.from("users").insert([
        {
          email,
          username,
          avatar_url,
        },
      ]).select().single(); // get inserted data

      if (insertError) throw insertError;

      // 4️⃣ Save session locally
      localStorage.setItem("user", JSON.stringify(data));

      // 5️⃣ Redirect to payment
      navigate("/payment");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <h2 className="futuristic-heading">Create Your Account</h2>

      <div className="futuristic-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="futuristic-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="futuristic-input"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="futuristic-input"
        />

        <button
          className="futuristic-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Continue"}
        </button>

        <p
          className="futuristic-link"
          style={{ cursor: "pointer", marginTop: "15px" }}
          onClick={() => navigate("/signin")}
        >
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
}
