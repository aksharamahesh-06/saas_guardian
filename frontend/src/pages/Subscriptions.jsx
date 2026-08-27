import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [renewal, setRenewal] = useState("");
  const [search, setSearch] = useState("");

  const fetchSubscriptions = async () => {
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

  useEffect(() => {
  const loadSubscriptions = async () => {
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

  loadSubscriptions();
}, []);

  const addSubscription = async () => {
    if (!name || !cost || !renewal) {
      alert("Please fill all fields");
      return;
    }

    const newSubscription = {
      name,
      cost: Number(cost),
      renewal,
      status: "Active",
    };

    try {
      await fetch(
        "http://localhost:5000/api/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubscription),
        }
      );

      setName("");
      setCost("");
      setRenewal("");

      fetchSubscriptions();

      alert("Subscription added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving subscription");
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/subscriptions/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalSubscriptions = subscriptions.length;

  const monthlySpend = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.cost || 0),
    0
  );

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "Active"
  ).length;

  const upcomingRenewals = subscriptions.filter((sub) => {
    const today = new Date();
    const renewalDate = new Date(sub.renewal);

    const diffDays = Math.ceil(
      (renewalDate - today) /
        (1000 * 60 * 60 * 24)
    );

    return diffDays >= 0 && diffDays <= 7;
  });

  const highestCost =
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
        background: "#F1F5F9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: "5px",
          }}
        >
          Subscription Management
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "20px",
          }}
        >
          Track, manage and optimize all subscriptions.
        </p>

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <Card
            title="Total Apps"
            value={totalSubscriptions}
          />

          <Card
            title="Monthly Spend"
            value={`₹${monthlySpend}`}
          />

          <Card
            title="Active Apps"
            value={activeSubscriptions}
          />

          <Card
            title="Renewals"
            value={upcomingRenewals.length}
          />
        </div>

        {/* ALERT */}

        {upcomingRenewals.length > 0 && (
          <div
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              padding: "18px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
              }}
            >
              ⚠ Upcoming Renewals
            </h3>

            {upcomingRenewals.map((sub) => (
              <p key={sub._id}>
                {sub.name} renews on {sub.renewal}
              </p>
            ))}
          </div>
        )}

        {/* ADD SUBSCRIPTION */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#0F172A",
            }}
          >
            Add Subscription
          </h3>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Software Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Monthly Cost"
              value={cost}
              onChange={(e) =>
                setCost(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={renewal}
              onChange={(e) =>
                setRenewal(e.target.value)
              }
              style={inputStyle}
            />

            <button
              onClick={addSubscription}
              style={{
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              + Add Subscription
            </button>
          </div>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search subscriptions..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        />

        {/* SUMMARY */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Subscription Insights
          </h3>

          <p>
            💰 Highest Cost App:{" "}
            <strong>
              {highestCost
                ? `${highestCost.name} (₹${highestCost.cost})`
                : "No Data"}
            </strong>
          </p>

          <p>
            📊 Potential Savings: ₹
            {Math.round(monthlySpend * 0.15)}
          </p>

          <p>
            ⚡ Recommendation:
            Review expensive subscriptions
            before renewal.
          </p>
        </div>

        {/* TABLE */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#0F172A",
            }}
          >
            All Subscriptions
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Software</th>
                <th style={thStyle}>Cost</th>
                <th style={thStyle}>Renewal</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr
                  key={sub._id}
                  style={{
                    background: "#F8FAFC",
                  }}
                >
                  <td style={tdStyle}>
                    {sub.name}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color: "#2563EB",
                      fontWeight: "700",
                    }}
                  >
                    ₹{sub.cost}
                  </td>

                  <td style={tdStyle}>
                    {sub.renewal}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background: "#DCFCE7",
                        color: "#15803D",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        deleteSubscription(sub._id)
                      }
                      style={{
                        background: "#EF4444",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "16px",
        borderRadius: "16px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <p
        style={{
          color: "#64748B",
          margin: 0,
          fontSize: "12px",
          textTransform: "uppercase",
          fontWeight: "700",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "8px",
          marginBottom: 0,
          color: "#0F172A",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  minWidth: "180px",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  color: "#475569",
};

const tdStyle = {
  padding: "15px",
  color: "#0F172A",
};

export default Subscriptions;