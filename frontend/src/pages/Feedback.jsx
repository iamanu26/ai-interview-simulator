import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch("http://127.0.0.1:8000/interview/feedback", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setFeedback(data.feedback);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Analyzing Interview...</h2>;
  if (!feedback) return <h2>No feedback available</h2>;

  return (
    <div style={styles.container}>
      <h1>📊 Interview Feedback</h1>

      <Score label="Communication" value={feedback.communication} />
      <Score label="Confidence" value={feedback.confidence} />
      <Score label="Technical Skills" value={feedback.technical} />
      <Score label="Grammar" value={feedback.grammar} />
      <Score label="Overall" value={feedback.overall} highlight />

      <div style={styles.summary}>
        <h3>📝 Summary</h3>
        <p>{feedback.summary}</p>
      </div>
    </div>
  );
}

function Score({ label, value, highlight }) {
  return (
    <div style={styles.scoreRow}>
      <span>{label}</span>
      <div style={styles.bar}>
        <div
          style={{
            ...styles.fill,
            width: `${value * 10}%`,
            background: highlight ? "#16a34a" : "#2563eb",
          }}
        />
      </div>
      <strong>{value}/10</strong>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    background: "#f8fafc",
    borderRadius: "12px",
  },
  scoreRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  bar: {
    flex: 1,
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "6px",
  },
  fill: {
    height: "100%",
    borderRadius: "6px",
  },
  summary: {
    marginTop: "30px",
    padding: "20px",
    background: "#e0f2fe",
    borderRadius: "10px",
  },
};
