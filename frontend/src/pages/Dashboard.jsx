function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>SaaS Guardian</h1>
      <p>AI-Powered Subscription & Expense Optimization Platform</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Total Subscriptions</h3>
          <h2>24</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Monthly Spend</h3>
          <h2>₹45,000</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Potential Savings</h3>
          <h2>₹12,000</h2>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Renewals Due</h3>
          <h2>5</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;