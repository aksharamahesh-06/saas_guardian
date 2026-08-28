import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [renewalReminders, setRenewalReminders] =
    useState(true);

  const [monthlyReports, setMonthlyReports] =
    useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/settings`,
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

        setRenewalReminders(
          data.renewalReminders ?? true
        );

        setMonthlyReports(
          data.monthlyReports ?? true
        );
      } catch (error) {
        console.error(
          "Error loading settings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            renewalReminders,
            monthlyReports,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      alert("Settings saved successfully!");
    } catch (error) {
      console.error(
        "Error saving settings:",
        error
      );

      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

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
          padding: "30px",
        }}
      >
        {/* HEADER */}

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: "6px",
          }}
        >
          Settings
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "25px",
          }}
        >
          Manage notifications, security and account
          preferences.
        </p>

        {/* STAT CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <StatCard
            title="Notifications"
            value={
              renewalReminders ||
              monthlyReports
                ? "Enabled"
                : "Disabled"
            }
            color="#2563EB"
          />

          <StatCard
            title="Reports"
            value={
              monthlyReports
                ? "Monthly"
                : "Off"
            }
            color="#10B981"
          />

          <StatCard
            title="Security"
            value="Protected"
            color="#F59E0B"
          />

          <StatCard
            title="Account"
            value="Active"
            color="#8B5CF6"
          />
        </div>

        {/* MAIN CONTENT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* NOTIFICATION SETTINGS */}

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
                color: "#0F172A",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              Notification Preferences
            </h2>

            {loading ? (
              <p
                style={{
                  color: "#64748B",
                  padding: "20px 0",
                }}
              >
                Loading settings...
              </p>
            ) : (
              <>
                <SettingRow
                  title="Renewal Reminders"
                  description="Receive alerts before subscriptions renew."
                  checked={renewalReminders}
                  onChange={() =>
                    setRenewalReminders(
                      !renewalReminders
                    )
                  }
                />

                <SettingRow
                  title="Monthly Reports"
                  description="Receive spending reports every month."
                  checked={monthlyReports}
                  onChange={() =>
                    setMonthlyReports(
                      !monthlyReports
                    )
                  }
                />

                <button
                  onClick={saveSettings}
                  disabled={saving}
                  style={{
                    marginTop: "25px",
                    background: saving
                      ? "#94A3B8"
                      : "linear-gradient(135deg,#2563EB,#1D4ED8)",
                    color: "#FFF",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "12px",
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "Save Settings"}
                </button>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* SECURITY */}

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "22px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: "#0F172A",
                }}
              >
                Security Status
              </h3>

              <p
                style={{
                  color: "#64748B",
                }}
              >
                Account protection is active.
              </p>

              <div
                style={{
                  background: "#DCFCE7",
                  color: "#166534",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Secure
              </div>
            </div>

            {/* ACCOUNT */}

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "22px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: "#0F172A",
                }}
              >
                Account Summary
              </h3>

              <p
                style={{
                  color: "#64748B",
                  lineHeight: "1.8",
                }}
              >
                SaaS Guardian helps track software
                subscriptions, renewal dates and
                spending patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "18px",
        borderRadius: "18px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontWeight: "700",
          fontSize: "13px",
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
          fontWeight: "800",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function SettingRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div
      style={{
        padding: "15px 0",
        borderBottom:
          "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4
          style={{
            margin: 0,
            color: "#0F172A",
          }}
        >
          {title}
        </h4>

        <p
          style={{
            marginTop: "4px",
            marginBottom: 0,
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Settings;