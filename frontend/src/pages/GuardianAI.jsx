import { useState } from "react";
import Sidebar from "../components/Sidebar";

function GuardianAI() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm Guardian AI 👋. Ask me about subscription costs, savings opportunities, renewals, or optimization tips.",
    },
  ]);

  const handleSend = () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    const q = question.toLowerCase();

    let aiResponse =
      "I can help analyze subscriptions, costs, renewals, and savings opportunities.";

    if (
      q.includes("reduce") ||
      q.includes("save") ||
      q.includes("expense")
    ) {
      aiResponse =
        "You can reduce expenses by cancelling unused subscriptions, reviewing high-cost apps, and switching frequently used services to annual plans.";
    } else if (
      q.includes("highest") ||
      q.includes("costliest")
    ) {
      aiResponse =
        "Visit the Analytics page to identify your highest-cost subscription and spending distribution.";
    } else if (
      q.includes("renewal") ||
      q.includes("renew")
    ) {
      aiResponse =
        "Check upcoming renewals regularly and cancel services before their renewal date if they are no longer needed.";
    } else if (q.includes("duplicate")) {
      aiResponse =
        "Look for subscriptions that provide similar features and keep only the one you use most.";
    } else if (q.includes("optimize")) {
      aiResponse =
        "Review low-usage subscriptions, remove duplicates, and consider bundled plans to optimize software spending.";
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        sender: "ai",
        text: aiResponse,
      },
    ]);

    setQuestion("");
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
            fontSize: "42px",
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Guardian AI
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "25px",
          }}
        >
          AI-powered subscription advisor and optimization assistant.
        </p>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              padding: "24px",
              color: "#FFFFFF",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontWeight: "800",
              }}
            >
              🤖 Guardian AI Assistant
            </h2>

            <p
              style={{
                marginTop: "8px",
                opacity: 0.9,
              }}
            >
              Ask questions about costs, renewals and savings.
            </p>
          </div>

          {/* Suggestions */}
          <div
            style={{
              padding: "18px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <Suggestion
              text="How can I reduce expenses?"
              setQuestion={setQuestion}
            />

            <Suggestion
              text="Show savings tips"
              setQuestion={setQuestion}
            />

            <Suggestion
              text="How to avoid renewals?"
              setQuestion={setQuestion}
            />

            <Suggestion
              text="Find duplicate subscriptions"
              setQuestion={setQuestion}
            />
          </div>

          {/* Chat */}
          <div
            style={{
              height: "450px",
              overflowY: "auto",
              background: "#F8FAFC",
              padding: "20px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    background:
                      msg.sender === "user"
                        ? "#2563EB"
                        : "#FFFFFF",
                    color:
                      msg.sender === "user"
                        ? "#FFFFFF"
                        : "#111827",
                    padding: "14px 18px",
                    borderRadius: "18px",
                    maxWidth: "70%",
                    lineHeight: "1.6",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "20px",
              display: "flex",
              gap: "12px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <input
              type="text"
              placeholder="Ask Guardian AI..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                fontSize: "15px",
              }}
            />

            <button
              onClick={handleSend}
              style={{
                background:
                  "linear-gradient(135deg,#2563EB,#7C3AED)",
                color: "#FFFFFF",
                border: "none",
                padding: "14px 24px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Suggestion({ text, setQuestion }) {
  return (
    <button
      onClick={() => setQuestion(text)}
      style={{
        border: "none",
        background: "#E0E7FF",
        color: "#4338CA",
        padding: "10px 14px",
        borderRadius: "999px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      {text}
    </button>
  );
}

export default GuardianAI;