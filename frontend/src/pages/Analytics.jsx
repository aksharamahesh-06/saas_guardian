import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiRequest from "../services/api";

function Analytics() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const data = await apiRequest("/subscriptions");
      return data;
    } catch (error) {
      console.error(
        "ANALYTICS FETCH ERROR:",
        error
      );

      return [];
    }
  };

  useEffect(() => {
    let cancelled = false;

    fetchSubscriptions().then((data) => {
      if (!cancelled) {
        setSubscriptions(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const totalSpend = subscriptions.reduce(
    (sum, sub) =>
      sum + Number(sub.cost || 0),
    0
  );

  const activeApps = subscriptions.filter(
    (sub) => sub.status === "Active"
  ).length;

  const pieData = subscriptions
    .map((sub) => ({
      name: sub.name,
      value: Number(sub.cost || 0),
    }))
    .filter((sub) => sub.value > 0);

  const COLORS = [
    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* HEADER */}

        <h1
          style={{
            color: "#111827",
            fontSize: "34px",
            fontWeight: "800",
            marginBottom: "6px",
          }}
        >
          Analytics
        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "15px",
            marginBottom: "25px",
          }}
        >
          Analyze spending and subscription
          data.
        </p>

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
          }}
        >
          <div style={cardStyle}>
            <h4 style={cardTitle}>
              Total Spend
            </h4>

            <h2 style={cardValue}>
              ₹{totalSpend}
            </h2>
          </div>

          <div style={cardStyle}>
            <h4 style={cardTitle}>
              Total Apps
            </h4>

            <h2 style={cardValue}>
              {subscriptions.length}
            </h2>
          </div>

          <div style={cardStyle}>
            <h4 style={cardTitle}>
              Active Apps
            </h4>

            <h2 style={cardValue}>
              {activeApps}
            </h2>
          </div>
        </div>

        {/* SPENDING DISTRIBUTION */}

        <div
          style={{
            background: "#FFFFFF",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
            marginTop: "25px",
          }}
        >
          <h3
            style={{
              color: "#111827",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            Spending Distribution
          </h3>

          {loading ? (
            <div
              style={{
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748B",
              }}
            >
              Loading analytics...
            </div>
          ) : pieData.length === 0 ? (
            <div
              style={{
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748B",
              }}
            >
              No subscription data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${value}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* SUBSCRIPTION COST TABLE */}

        <div
          style={{
            background: "#FFFFFF",
            marginTop: "25px",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
            overflowX: "auto",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#111827",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            Subscription Costs
          </h3>

          {loading ? (
            <p
              style={{
                textAlign: "center",
                color: "#64748B",
                padding: "25px",
              }}
            >
              Loading subscriptions...
            </p>
          ) : subscriptions.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#64748B",
                padding: "25px",
              }}
            >
              No subscriptions available.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(to right,#EFF6FF,#F8FAFC)",
                  }}
                >
                  <th style={tableHeader}>
                    Software
                  </th>

                  <th style={tableHeader}>
                    Cost
                  </th>

                  <th style={tableHeader}>
                    Renewal
                  </th>

                  <th style={tableHeader}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map(
                  (sub) => (
                    <tr
                      key={sub._id}
                      style={{
                        borderBottom:
                          "1px solid #E5E7EB",
                      }}
                    >
                      <td style={tableCell}>
                        {sub.name}
                      </td>

                      <td
                        style={{
                          ...tableCell,
                          fontWeight: "800",
                          color: "#2563EB",
                          fontSize: "16px",
                        }}
                      >
                        ₹{sub.cost}
                      </td>

                      <td style={tableCell}>
                        {sub.renewal}
                      </td>

                      <td style={tableCell}>
                        <span
                          style={{
                            background:
                              sub.status ===
                              "Active"
                                ? "#DCFCE7"
                                : "#FEE2E2",
                            color:
                              sub.status ===
                              "Active"
                                ? "#166534"
                                : "#DC2626",
                            padding:
                              "6px 12px",
                            borderRadius:
                              "20px",
                            fontSize:
                              "13px",
                            fontWeight:
                              "700",
                          }}
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "20px",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
};

const cardTitle = {
  color: "#64748B",
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "10px",
};

const cardValue = {
  color: "#0F172A",
  fontSize: "34px",
  fontWeight: "800",
  margin: 0,
};

const tableHeader = {
  padding: "14px",
  color: "#0F172A",
  fontWeight: "800",
  fontSize: "14px",
  textAlign: "left",
};

const tableCell = {
  padding: "14px",
  color: "#374151",
  fontWeight: "600",
  textAlign: "left",
};

export default Analytics;