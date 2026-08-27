import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRight: "1px solid #ECECEC",
      }}
    >
      <h1>
        SaaS <span style={{ color: "#E8B400" }}>Guardian</span>
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
        <Link to="/" style={linkStyle}>
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

        <Link to="/settings" style={linkStyle}>
          Settings
        </Link>

        <Link to="/invoice-upload" style={linkStyle}>
          Invoice Upload
        </Link>

        <Link to="/guardian-ai" style={linkStyle}>
          Guardian AI
        </Link>
      </div>
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