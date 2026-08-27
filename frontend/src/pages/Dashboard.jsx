import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/subscriptions")
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const potentialSavings = Math.round(monthlySpend * 0.15);

  const averageCost =
    totalSubscriptions > 0
      ? Math.round(monthlySpend / totalSubscriptions)
      : 0;

  const upcomingRenewals = subscriptions.filter((sub) => {
    const today = new Date();
    const renewalDate = new Date(sub.renewal);

    const diffDays = Math.ceil(
      (renewalDate - today) /
        (1000 * 60 * 60 * 24)
    );

    return diffDays >= 0 && diffDays <= 7;
  }).length;

  const healthScore = Math.max(
    50,
    100 -
      upcomingRenewals * 5 -
      inactiveSubscriptions * 3
  );

  const highestExpense =
    subscriptions.length > 0
      ? subscriptions.reduce((prev, current) =>
          Number(prev.cost) > Number(current.cost)
            ? prev
            : current
        )
      : null;

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <RevenueChart />

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "15px",
                color: "#0F172A",
              }}
            >
              Guardian AI
            </h3>

            <div
              style={{
                background: "#F8FAFC",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#64748B",
                  fontSize: "13px",
                }}
              >
                Highest Expense
              </p>

              <h3
                style={{
                  marginTop: "8px",
                  marginBottom: 0,
                  color: "#0F172A",
                }}
              >
                {highestExpense
                  ? `${highestExpense.name}`
                  : "No Data"}
              </h3>

              <p
                style={{
                  marginTop: "5px",
                  color: "#2563EB",
                  fontWeight: "700",
                }}
              >
                {highestExpense
                  ? `₹${highestExpense.cost}`
                  : ""}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  background: "#DCFCE7",
                  color: "#166534",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                💰 Savings Opportunity:
                ₹{potentialSavings}
              </div>

              <div
                style={{
                  background: "#DBEAFE",
                  color: "#1D4ED8",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                📅 Renewals:
                {upcomingRenewals}
              </div>

              <div
                style={{
                  background: "#FEF3C7",
                  color: "#B45309",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                ⚡ Review costly subscriptions
                before renewal.
              </div>
            </div>
          </div>
        </div>

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
                background: "#FEF3C7",
                color: "#B45309",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              {subscriptions.length} Apps
            </span>
          </div>

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
                      borderBottomLeftRadius: "12px",
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
                      borderBottomRightRadius: "12px",
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
      </div>
    </div>
  );
}

export default Dashboard;