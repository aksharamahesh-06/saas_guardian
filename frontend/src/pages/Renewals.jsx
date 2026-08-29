import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Renewals() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRenewals = async () => {
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
          "Error loading renewals:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadRenewals();
  }, []);

  const getDaysRemaining = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);

    today.setHours(0, 0, 0, 0);
    renewal.setHours(0, 0, 0, 0);

    return Math.ceil(
      (renewal - today) /
        (1000 * 60 * 60 * 24)
    );
  };

  const getStatus = (days) => {
    if (days <= 3) return "Urgent";
    if (days <= 7) return "Soon";
    return "Safe";
  };

  const getColor = (status) => {
    if (status === "Urgent") return "#DC2626";
    if (status === "Soon") return "#D97706";
    return "#16A34A";
  };

  const renewals = subscriptions
    .map((subscription) => ({
      ...subscription,
      days: getDaysRemaining(
        subscription.renewal
      ),
    }))
    .filter(
      (subscription) =>
        subscription.days >= 0
    )
    .sort(
      (a, b) => a.days - b.days
    );

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
        {/* HEADER */}

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "6px",
            }}
          >
            Renewal Center
          </h1>

          <p
            style={{
              color: "#64748B",
              margin: 0,
            }}
          >
            Track upcoming subscription renewal dates.
          </p>
        </div>

        {/* SUMMARY CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <SummaryCard
            title="Upcoming Renewals"
            value={renewals.length}
          />

          <SummaryCard
            title="Urgent"
            value={
              renewals.filter(
                (item) =>
                  getStatus(item.days) ===
                  "Urgent"
              ).length
            }
          />

          <SummaryCard
            title="Due Soon"
            value={
              renewals.filter(
                (item) =>
                  getStatus(item.days) ===
                  "Soon"
              ).length
            }
          />

          <SummaryCard
            title="Safe"
            value={
              renewals.filter(
                (item) =>
                  getStatus(item.days) ===
                  "Safe"
              ).length
            }
          />
        </div>

        {/* CONTENT */}

        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#0F172A",
              marginBottom: "20px",
            }}
          >
            Upcoming Renewals
          </h2>

          {loading ? (
            <p
              style={{
                color: "#64748B",
                padding: "20px 0",
              }}
            >
              Loading renewal information...
            </p>
          ) : renewals.length === 0 ? (
            <div
              style={{
                background: "#F8FAFC",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  color: "#0F172A",
                  marginBottom: "8px",
                }}
              >
                No upcoming renewals
              </h3>

              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                }}
              >
                There are currently no upcoming
                subscription renewals.
              </p>
            </div>
          ) : (
            renewals.map((item) => {
              const status =
                getStatus(item.days);

              return (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: "#F8FAFC",
                    padding: "22px",
                    marginBottom: "15px",
                    borderRadius: "16px",
                    border:
                      "1px solid #E2E8F0",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: "#0F172A",
                        fontSize: "20px",
                      }}
                    >
                      {item.name}
                    </h2>

                    <p
                      style={{
                        color: "#64748B",
                        margin:
                          "8px 0 4px",
                      }}
                    >
                      Renewal date:{" "}
                      <strong>
                        {item.renewal}
                      </strong>
                    </p>

                    <p
                      style={{
                        color: "#475569",
                        margin: 0,
                      }}
                    >
                      {item.days === 0
                        ? "Renews today"
                        : item.days === 1
                        ? "Renewal in 1 day"
                        : `Renewal in ${item.days} days`}
                    </p>
                  </div>

                  <span
                    style={{
                      backgroundColor:
                        getColor(status),
                      color: "#FFFFFF",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "20px",
        borderRadius: "18px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "13px",
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "10px",
          marginBottom: 0,
          color: "#0F172A",
          fontSize: "30px",
          fontWeight: "800",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default Renewals;