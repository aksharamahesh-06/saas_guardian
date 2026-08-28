import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRight: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>
        SaaS{" "}
        <span style={{ color: "#E8B400" }}>
          Guardian
        </span>
      </h1>

      <p>Track. Optimize. Save.</p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/subscriptions" style={linkStyle}>
          Subscriptions
        </Link>

        <Link to="/analytics" style={linkStyle}>
          Analytics
        </Link>

        <Link to="/reports" style={linkStyle}>
          Reports
        </Link>

        <Link to="/renewals" style={linkStyle}>
          Renewals
        </Link>

        <Link to="/settings" style={linkStyle}>
          Settings
        </Link>

        <Link to="/invoice-upload" style={linkStyle}>
          Invoice Upload
        </Link>
      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "12px 16px",
          backgroundColor: "#FEE2E2",
          color: "#DC2626",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "700",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#6B7280",
  fontSize: "22px",
  fontWeight: "600",
};

export default Sidebar;