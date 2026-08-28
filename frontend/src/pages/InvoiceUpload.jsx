import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function InvoiceUpload() {
  const [invoices, setInvoices] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // INITIAL LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `${import.meta.env.VITE_API_URL}/api/invoices`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        setInvoices(data);
      })
      .catch((error) => {
        console.error(
          "Error loading invoices:",
          error
        );

        setError("Unable to load invoices.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // REFRESH INVOICES
  const refreshInvoices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/invoices`,
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

      setInvoices(data);
    } catch (error) {
      console.error(
        "Error refreshing invoices:",
        error
      );

      setError("Unable to refresh invoices.");
    }
  };

  // FILE SELECTION
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only PDF, JPG and PNG files are allowed."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(
        "File size must be less than 10 MB."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
    setError("");
  };

  // UPLOAD
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an invoice first.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "invoice",
        selectedFile
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/invoices/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      alert(
        "Invoice uploaded successfully!"
      );

      setSelectedFile(null);

      const fileInput =
        document.getElementById(
          "invoice-file"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      await refreshInvoices();
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      setError(
        error.message ||
          "Failed to upload invoice."
      );
    } finally {
      setUploading(false);
    }
  };

  // FILE SIZE
  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${Math.round(kb)} KB`;
    }

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  // DATE
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // FILE TYPE
  const getFileType = (type) => {
    if (type === "application/pdf") {
      return "PDF";
    }

    if (type === "image/jpeg") {
      return "JPG";
    }

    if (type === "image/png") {
      return "PNG";
    }

    return "File";
  };

  // STATISTICS
  const totalInvoices = invoices.length;

  const uploadedToday = invoices.filter(
    (invoice) => {
      if (!invoice.uploadedAt) {
        return false;
      }

      const uploadDate = new Date(
        invoice.uploadedAt
      );

      const today = new Date();

      return (
        uploadDate.getDate() ===
          today.getDate() &&
        uploadDate.getMonth() ===
          today.getMonth() &&
        uploadDate.getFullYear() ===
          today.getFullYear()
      );
    }
  ).length;

  const pdfInvoices = invoices.filter(
    (invoice) =>
      invoice.fileType ===
      "application/pdf"
  ).length;

  const imageInvoices = invoices.filter(
    (invoice) =>
      invoice.fileType ===
        "image/jpeg" ||
      invoice.fileType ===
        "image/png"
  ).length;

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
            Invoice Upload
          </h1>

          <p
            style={{
              color: "#64748B",
              margin: 0,
            }}
          >
            Upload and manage your
            subscription invoices.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {/* KPI CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <Card
            title="Total Invoices"
            value={totalInvoices}
            color="#2563EB"
          />

          <Card
            title="Uploaded Today"
            value={uploadedToday}
            color="#10B981"
          />

          <Card
            title="PDF Invoices"
            value={pdfInvoices}
            color="#8B5CF6"
          />

          <Card
            title="Image Invoices"
            value={imageInvoices}
            color="#F59E0B"
          />
        </div>

        {/* UPLOAD AREA */}

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            border:
              "2px dashed #CBD5E1",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            📄
          </div>

          <h2
            style={{
              color: "#0F172A",
              marginBottom: "8px",
            }}
          >
            Upload Invoice
          </h2>

          <p
            style={{
              color: "#64748B",
              marginBottom: "20px",
            }}
          >
            Upload a PDF, JPG or PNG
            invoice.
            <br />
            Maximum file size: 10 MB.
          </p>

          <input
            id="invoice-file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{
              marginBottom: "15px",
            }}
          />

          {selectedFile && (
            <div
              style={{
                background: "#EFF6FF",
                color: "#1D4ED8",
                padding: "12px 15px",
                borderRadius: "10px",
                margin:
                  "10px auto 15px",
                maxWidth: "500px",
                fontWeight: "600",
              }}
            >
              Selected:{" "}
              {selectedFile.name}

              <br />

              <span
                style={{
                  fontSize: "13px",
                  color: "#64748B",
                }}
              >
                {formatFileSize(
                  selectedFile.size
                )}
              </span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              !selectedFile
            }
            style={{
              background:
                uploading ||
                !selectedFile
                  ? "#94A3B8"
                  : "linear-gradient(135deg,#2563EB,#1D4ED8)",
              color: "#FFFFFF",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor:
                uploading ||
                !selectedFile
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            {uploading
              ? "Uploading..."
              : "Upload Invoice"}
          </button>
        </div>

        {/* UPLOADED INVOICES */}

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
              marginTop: 0,
              marginBottom: "20px",
              color: "#0F172A",
            }}
          >
            Uploaded Invoices
          </h2>

          {loading ? (
            <p
              style={{
                color: "#64748B",
                padding: "20px 0",
              }}
            >
              Loading invoices...
            </p>
          ) : invoices.length === 0 ? (
            <div
              style={{
                background: "#F8FAFC",
                padding: "35px",
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
                No invoices uploaded
              </h3>

              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                }}
              >
                Upload your first invoice
                using the section above.
              </p>
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                  minWidth: "700px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(to right,#EFF6FF,#F8FAFC)",
                    }}
                  >
                    <th style={thStyle}>
                      Invoice
                    </th>

                    <th style={thStyle}>
                      Type
                    </th>

                    <th style={thStyle}>
                      Size
                    </th>

                    <th style={thStyle}>
                      Uploaded
                    </th>

                    <th style={thStyle}>
                      Status
                    </th>

                    <th style={thStyle}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.map(
                    (invoice) => (
                      <tr
                        key={
                          invoice._id
                        }
                        style={{
                          borderBottom:
                            "1px solid #E5E7EB",
                        }}
                      >
                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={{
                              fontWeight:
                                "700",
                              color:
                                "#0F172A",
                            }}
                          >
                            {
                              invoice.originalName
                            }
                          </div>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {getFileType(
                            invoice.fileType
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {formatFileSize(
                            invoice.fileSize
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {formatDate(
                            invoice.uploadedAt
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <span
                            style={{
                              background:
                                "#DCFCE7",
                              color:
                                "#166534",
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
                            {
                              invoice.status
                            }
                          </span>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <a
                            href={`${import.meta.env.VITE_API_URL}/uploads/${invoice.fileName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                "inline-block",
                              background:
                                "#EFF6FF",
                              color:
                                "#2563EB",
                              padding:
                                "8px 14px",
                              borderRadius:
                                "8px",
                              textDecoration:
                                "none",
                              fontWeight:
                                "700",
                              fontSize:
                                "13px",
                            }}
                          >
                            View
                          </a>
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

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "20px",
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
          fontSize: "13px",
          fontWeight: "700",
          textTransform:
            "uppercase",
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

const thStyle = {
  textAlign: "left",
  padding: "14px",
  color: "#475569",
  fontWeight: "800",
  fontSize: "14px",
};

const tdStyle = {
  padding: "15px 14px",
  color: "#0F172A",
  fontWeight: "500",
};

export default InvoiceUpload;