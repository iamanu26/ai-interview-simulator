import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Interview Simulator</h1>
      <p style={styles.subtitle}>
        Practice HR & Technical interviews in a real-time AI-powered environment.
      </p>

      <div style={styles.buttons}>
        <Link to="/login">
          <button style={styles.primary}>Start Practicing</button>
        </Link>
        <Link to="/about">
          <button style={styles.secondary}>Learn More</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    color: "#555",
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
  },
  primary: {
    padding: "12px 24px",
    fontSize: "16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  secondary: {
    padding: "12px 24px",
    fontSize: "16px",
    background: "#e5e7eb",
    border: "none",
    cursor: "pointer",
  },
};
