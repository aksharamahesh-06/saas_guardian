function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        minHeight: "85px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          marginTop: "8px",
          marginBottom: 0,
          color: "#0F172A",
          fontSize: "24px",
          fontWeight: "800",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;