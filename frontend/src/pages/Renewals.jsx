import Sidebar from "../components/Sidebar";

function Renewals() {
  const renewals = [
    {
      name: "Netflix",
      days: 2,
      status: "Urgent",
    },
    {
      name: "Spotify",
      days: 5,
      status: "Soon",
    },
    {
      name: "ChatGPT Plus",
      days: 12,
      status: "Safe",
    },
  ];

  const getColor = (status) => {
    if (status === "Urgent") return "#FF4D4F";
    if (status === "Soon") return "#FAAD14";
    return "#52C41A";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Renewal Center
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Track upcoming subscription renewals.
        </p>

        {renewals.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2>{item.name}</h2>

            <p>
              Renewal in {item.days} days
            </p>

            <span
              style={{
                backgroundColor: getColor(
                  item.status
                ),
                color: "#FFF",
                padding: "8px 15px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Renewals;