import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Reports() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/subscriptions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status}`
          );
        }

        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error(
          "Error loading reports:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalSubscriptions = subscriptions.length;

  const monthlySpend = subscriptions.reduce(
    (total, sub) =>
      total + Number(sub.cost || 0),
    0
  );

  const annualSpend = monthlySpend * 12;

  const activeSubscriptions =
    subscriptions.filter(
      (sub) => sub.status === "Active"
    ).length;

  const inactiveSubscriptions =
    totalSubscriptions -
    activeSubscriptions;

  const potentialSavings = Math.round(
    monthlySpend * 0.15
  );

  const averageCost =
    totalSubscriptions > 0
      ? Math.round(
          monthlySpend /
            totalSubscriptions
        )
      : 0;

  const highestExpense =
    subscriptions.length > 0
      ? subscriptions.reduce(
          (prev, current) =>
            Number(prev.cost) >
            Number(current.cost)
              ? prev
              : current
        )
      : null;

  const healthScore = Math.max(
    50,
    100 - inactiveSubscriptions * 5
  );

  const downloadReport = () => {
    let csv =
      "Software,Cost,Renewal Date,Status\n";

    subscriptions.forEach((sub) => {
      csv += `"${sub.name}",${sub.cost},"${sub.renewal}","${sub.status}"\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "SaaS_Guardian_Report.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

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
        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              color: "#111827",
              marginBottom: "6px",
            }}
          >
            Reports Center
          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "15px",
            }}
          >
            Review subscription spending, usage,
            renewals and account statistics.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <div style={reportCard}>
            <p style={reportTitle}>
              TOTAL APPS
            </p>

            <h2 style={reportValue}>
              {totalSubscriptions}
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              MONTHLY SPEND
            </p>

            <h2
              style={{
                ...reportValue,
                color: "#2563EB",
              }}
            >
              ₹{monthlySpend}
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              ANNUAL SPEND
            </p>

            <h2
              style={{
                ...reportValue,
                color: "#8B5CF6",
              }}
            >
              ₹{annualSpend}
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              POTENTIAL SAVINGS
            </p>

            <h2
              style={{
                ...reportValue,
                color: "#F97316",
              }}
            >
              ₹{potentialSavings}
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              HEALTH SCORE
            </p>

            <h2
              style={{
                ...reportValue,
                color: "#10B981",
              }}
            >
              {healthScore}%
            </h2>
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Executive Summary
          </h2>

          <p style={summaryText}>
            Monthly Spend:
            <strong> ₹{monthlySpend}</strong>
          </p>

          <p style={summaryText}>
            Annual Spend:
            <strong> ₹{annualSpend}</strong>
          </p>

          <p style={summaryText}>
            Active Services:
            <strong>
              {" "}
              {activeSubscriptions}
            </strong>
          </p>

          <p style={summaryText}>
            Inactive Services:
            <strong>
              {" "}
              {inactiveSubscriptions}
            </strong>
          </p>

          <p style={summaryText}>
            Highest Expense:
            <strong>
              {" "}
              {highestExpense
                ? `${highestExpense.name} (₹${highestExpense.cost})`
                : "No Data"}
            </strong>
          </p>

          <p style={summaryText}>
            Potential Savings:
            <strong>
              {" "}
              ₹{potentialSavings}
            </strong>
          </p>

          <p style={summaryText}>
            Average Subscription Cost:
            <strong>
              {" "}
              ₹{averageCost}
            </strong>
          </p>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                color: "#111827",
                margin: 0,
              }}
            >
              Subscription Details
            </h2>

            <button
              onClick={downloadReport}
              disabled={
                loading ||
                subscriptions.length === 0
              }
              style={{
                background:
                  loading ||
                  subscriptions.length === 0
                    ? "#94A3B8"
                    : "linear-gradient(135deg,#2563EB,#1D4ED8)",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                cursor:
                  loading ||
                  subscriptions.length === 0
                    ? "not-allowed"
                    : "pointer",
                fontWeight: "700",
              }}
            >
              Download Report
            </button>
          </div>

          {loading ? (
            <p
              style={{
                color: "#64748B",
                padding: "20px 0",
              }}
            >
              Loading subscription data...
            </p>
          ) : subscriptions.length === 0 ? (
            <p
              style={{
                color: "#64748B",
                padding: "20px 0",
              }}
            >
              No subscriptions found.
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
                            color: "#2563EB",
                            fontWeight: "800",
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const reportCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "20px",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
};

const reportTitle = {
  color: "#64748B",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  marginBottom: "10px",
};

const reportValue = {
  color: "#0F172A",
  fontSize: "32px",
  fontWeight: "800",
  margin: 0,
};

const summaryText = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "2",
};

const tableHeader = {
  padding: "14px",
  color: "#111827",
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

export default Reports;