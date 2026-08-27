import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenueChart() {
  const data = [
    { month: "Jan", spend: 1200 },
    { month: "Feb", spend: 1800 },
    { month: "Mar", spend: 1500 },
    { month: "Apr", spend: 2200 },
    { month: "May", spend: 2600 },
    { month: "Jun", spend: 2400 },
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "20px",
            }}
          >
            Revenue Analytics
          </h3>

          <p
            style={{
              marginTop: "5px",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Monthly Subscription Spend
          </p>
        </div>

        <div
          style={{
            background: "#DCFCE7",
            color: "#166534",
            padding: "8px 12px",
            borderRadius: "10px",
            fontWeight: "700",
          }}
        >
            +12.5%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

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
    </div>
  );
}

export default RevenueChart;