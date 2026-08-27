import { useState } from "react";
import Sidebar from "../components/Sidebar";

function InvoiceUpload() {
  const [fileName, setFileName] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      setShowResult(true);
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
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: "5px",
          }}
        >
          Invoice Upload
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "25px",
          }}
        >
          Upload invoices and automatically detect subscriptions.
        </p>

        {/* KPI Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <Card title="Total Invoices" value="24" />
          <Card title="Monthly Amount" value="₹18,450" />
          <Card title="Renewals Due" value="5" />
          <Card title="Potential Savings" value="₹2,700" />
        </div>

        {/* Upload Area */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            border: "2px dashed #CBD5E1",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#0F172A",
            }}
          >
            Upload Invoice
          </h2>

          <p
            style={{
              color: "#64748B",
            }}
          >
            PDF, JPG, PNG Supported
          </p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleUpload}
            style={{
              marginTop: "15px",
            }}
          />

          {fileName && (
            <div
              style={{
                marginTop: "15px",
                background: "#DCFCE7",
                color: "#166534",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              Uploaded: {fileName}
            </div>
          )}
        </div>

        {/* AI Extraction */}

        {showResult && (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "25px",
              marginTop: "25px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#0F172A",
              }}
            >
              🤖 AI Invoice Extraction
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <InfoCard
                label="Vendor"
                value="Netflix"
              />

              <InfoCard
                label="Amount"
                value="₹649"
              />

              <InfoCard
                label="Plan"
                value="Premium Monthly"
              />

              <InfoCard
                label="Renewal Date"
                value="15 Sep 2026"
              />
            </div>

            <button
              style={{
                marginTop: "20px",
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Add Subscription
            </button>
          </div>
        )}

        {/* Smart Insights */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2>💡 Smart Insights</h2>

          <p>
            Highest Invoice:
            <strong> Adobe Creative Cloud</strong>
          </p>

          <p>
            Potential Duplicate:
            <strong> Zoom + Teams</strong>
          </p>

          <p>
            Upcoming Payment Alert:
            <strong> Netflix renews in 5 days</strong>
          </p>
        </div>

        {/* Recent Invoices */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Recent Uploaded Invoices
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
                <th style={thStyle}>Invoice</th>
                <th style={thStyle}>Vendor</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                style={{
                  background: "#F8FAFC",
                }}
              >
                <td style={tdStyle}>INV001</td>
                <td style={tdStyle}>Netflix</td>
                <td
                  style={{
                    ...tdStyle,
                    color: "#2563EB",
                    fontWeight: "700",
                  }}
                >
                  ₹649
                </td>
                <td style={tdStyle}>15 Aug 2026</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#DCFCE7",
                      color: "#166534",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "700",
                    }}
                  >
                    Paid
                  </span>
                </td>
              </tr>
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
        borderRadius: "18px",
        padding: "20px",
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
          color: "#0F172A",
          fontWeight: "800",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        padding: "18px",
        borderRadius: "15px",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "13px",
        }}
      >
        {label}
      </p>

      <h3
        style={{
          marginTop: "8px",
          color: "#0F172A",
        }}
      >
        {value}
      </h3>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  color: "#475569",
};

const tdStyle = {
  padding: "15px",
  color: "#0F172A",
};

export default InvoiceUpload;