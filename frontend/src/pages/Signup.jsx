import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
      });

      alert("✅ Account Created Successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      alert(error.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #081120 0%, #102347 50%, #0f1d35 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#0f1d35",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 30px rgba(37,99,235,0.25)",
          border: "1px solid #1f3b6d",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          SaaS Guardian
        </h1>

        <p
          style={{
            color: "#9cb3d9",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          Create your workspace and start
          managing subscriptions smarter
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "10px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            color: "#9cb3d9",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #243a63",
  background: "#162847",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

export default Signup;