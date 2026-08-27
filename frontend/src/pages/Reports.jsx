import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [subscriptions, setSubscriptions] = useState([]);



  useEffect(() => {
  const loadData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/subscriptions"
      );

      const data = await response.json();

      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadData();
}, []);

  const totalSubscriptions =
    subscriptions.length;

  const monthlySpend =
    subscriptions.reduce(
      (total, sub) =>
        total + Number(sub.cost || 0),
      0
    );

  const annualSpend =
    monthlySpend * 12;

  const activeSubscriptions =
    subscriptions.filter(
      (sub) =>
        sub.status === "Active"
    ).length;

  const inactiveSubscriptions =
    totalSubscriptions -
    activeSubscriptions;

  const potentialSavings =
    Math.round(monthlySpend * 0.15);

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
    100 -
      inactiveSubscriptions * 5
  );

  const downloadReport = () => {
    let csv =
      "Software,Cost,Renewal Date,Status\n";

    subscriptions.forEach(
      (sub) => {
        csv += `${sub.name},${sub.cost},${sub.renewal},${sub.status}\n`;
      }
    );

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "SaaS_Guardian_Report.csv"
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    window.URL.revokeObjectURL(
      url
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "#F3F4F6",
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
            Executive summary of
            subscription spending,
            optimization opportunities
            and SaaS health.
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

            <h2
              style={reportValue}
            >
              {
                totalSubscriptions
              }
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              MONTHLY SPEND
            </p>

            <h2
              style={{
                ...reportValue,
                color:
                  "#2563EB",
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
                color:
                  "#8B5CF6",
              }}
            >
              ₹{annualSpend}
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              SAVINGS
            </p>

            <h2
              style={{
                ...reportValue,
                color:
                  "#F97316",
              }}
            >
              ₹
              {
                potentialSavings
              }
            </h2>
          </div>

          <div style={reportCard}>
            <p style={reportTitle}>
              HEALTH SCORE
            </p>

            <h2
              style={{
                ...reportValue,
                color:
                  "#10B981",
              }}
            >
              {healthScore}%
            </h2>
          </div>
        </div>
                <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              padding: "25px",
              borderRadius: "20px",
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
              💰 Monthly Spend:
              <strong> ₹{monthlySpend}</strong>
            </p>

            <p style={summaryText}>
              📈 Annual Spend:
              <strong> ₹{annualSpend}</strong>
            </p>

            <p style={summaryText}>
              📦 Active Services:
              <strong>
                {" "}
                {activeSubscriptions}
              </strong>
            </p>

            <p style={summaryText}>
              🚀 Highest Expense:
              <strong>
                {" "}
                {highestExpense
                  ? `${highestExpense.name} (₹${highestExpense.cost})`
                  : "No Data"}
              </strong>
            </p>

            <p style={summaryText}>
              💡 Potential Savings:
              <strong>
                {" "}
                ₹{potentialSavings}
              </strong>
            </p>

            <p style={summaryText}>
              📊 Average Cost:
              <strong>
                {" "}
                ₹{averageCost}
              </strong>
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#EFF6FF,#F8FAFC)",
              padding: "25px",
              borderRadius: "20px",
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
              AI Recommendations
            </h2>

            <ul
              style={{
                lineHeight: "2",
                color: "#374151",
                fontWeight: "600",
                paddingLeft: "20px",
              }}
            >
              <li>
                Review inactive
                subscriptions monthly.
              </li>

              <li>
                Focus on reducing the
                highest expense software.
              </li>

              <li>
                Consider annual plans
                for frequently used tools.
              </li>

              <li>
                Potential monthly savings
                of ₹{potentialSavings}.
              </li>

              <li>
                Consolidate duplicate
                software subscriptions.
              </li>
            </ul>
          </div>
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
          <h2
            style={{
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Subscription Details
          </h2>

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
              {subscriptions.map((sub) => (
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
                          "#DCFCE7",
                        color: "#166534",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "13px",
                        fontWeight:
                          "700",
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={downloadReport}
            style={{
              marginTop: "25px",
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
              color: "#FFFFFF",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

const reportCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
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
};

const tableCell = {
  padding: "14px",
  color: "#374151",
  fontWeight: "600",
};

export default Reports;