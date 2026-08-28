import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenueChart({ subscriptions = [] }) {
  const data = subscriptions.map((sub) => ({
    name: sub.name,
    spend: Number(sub.cost || 0),
  }));

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "20px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "20px",
          }}
        >
          Subscription Spending
        </h3>

        <p
          style={{
            marginTop: "5px",
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          Spending by subscription
        </p>
      </div>

      {data.length === 0 ? (
        <div
          style={{
            height: "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#64748B",
          }}
        >
          No subscription data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="spend"
              stroke="#2563EB"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RevenueChart;