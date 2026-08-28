import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import apiRequest from "../services/api";

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await apiRequest("/subscriptions");
        setSubscriptions(data);
      } catch (error) {
        console.error(
          "DASHBOARD SUBSCRIPTIONS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const totalSubscriptions = subscriptions.length;

  const monthlySpend = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost || 0),
    0
  );

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "Active"
  ).length;

  const inactiveSubscriptions =
    totalSubscriptions - activeSubscriptions;

  const potentialSavings = Math.round(
    monthlySpend * 0.15
  );

  const averageCost =
    totalSubscriptions > 0
      ? Math.round(
          monthlySpend / totalSubscriptions
        )
      : 0;

  const upcomingRenewals = subscriptions.filter(
    (sub) => {
      const today = new Date();
      const renewalDate = new Date(sub.renewal);

      const diffDays = Math.ceil(
        (renewalDate - today) /
          (1000 * 60 * 60 * 24)
      );

      return diffDays >= 0 && diffDays <= 7;
    }
  ).length;

  const healthScore = Math.max(
    50,
    100 -
      upcomingRenewals * 5 -
      inactiveSubscriptions * 3
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#F1F5F9",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#0F172A",
            }}
          >
            Loading Dashboard...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F1F5F9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "6px",
            }}
          >
            SaaS Guardian Dashboard
          </h1>

          <p
            style={{
              color: "#64748B",
              margin: 0,
            }}
          >
            Monitor subscriptions, spending,
            renewals and optimization opportunities.
          </p>
        </div>

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
          }}
        >
          <StatCard
            title="Health Score"
            value={`${healthScore}/100`}
          />

          <StatCard
            title="Monthly Spend"
            value={`₹${monthlySpend}`}
          />

          <StatCard
            title="Active Apps"
            value={activeSubscriptions}
          />

          <StatCard
            title="Renewals"
            value={upcomingRenewals}
          />

          <StatCard
            title="Savings"
            value={`₹${potentialSavings}`}
          />

          <StatCard
            title="Average Cost"
            value={`₹${averageCost}`}
          />
        </div>

        {/* SPENDING CHART */}

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <RevenueChart
            subscriptions={subscriptions}
          />
        </div>

        {/* RECENT SUBSCRIPTIONS */}

        <div
          style={{
            marginTop: "20px",
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
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
            <h2
              style={{
                margin: 0,
                color: "#0F172A",
                fontSize: "22px",
              }}
            >
              Recent Subscriptions
            </h2>

            <span
              style={{
                background: "#DBEAFE",
                color: "#1D4ED8",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              {subscriptions.length} Apps
            </span>
          </div>

          {subscriptions.length === 0 ? (
            <p
              style={{
                color: "#64748B",
                textAlign: "center",
                padding: "30px",
              }}
            >
              No subscriptions added yet.
            </p>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        color: "#374151",
                        padding: "12px",
                      }}
                    >
                      Software
                    </th>

                    <th
                      style={{
                        textAlign: "left",
                        color: "#374151",
                        padding: "12px",
                      }}
                    >
                      Cost
                    </th>

                    <th
                      style={{
                        textAlign: "left",
                        color: "#374151",
                        padding: "12px",
                      }}
                    >
                      Renewal
                    </th>

                    <th
                      style={{
                        textAlign: "left",
                        color: "#374151",
                        padding: "12px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub._id}
                      style={{
                        background: "#F8FAFC",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px",
                          color: "#0F172A",
                          fontWeight: "700",
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius:
                            "12px",
                        }}
                      >
                        {sub.name}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          color: "#2563EB",
                          fontWeight: "700",
                        }}
                      >
                        ₹{sub.cost}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          color: "#475569",
                        }}
                      >
                        {sub.renewal}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius:
                            "12px",
                        }}
                      >
                        <span
                          style={{
                            background:
                              sub.status === "Active"
                                ? "#DCFCE7"
                                : "#FEE2E2",
                            color:
                              sub.status === "Active"
                                ? "#15803D"
                                : "#DC2626",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;