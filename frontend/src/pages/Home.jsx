import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.wrapper}>
      {/* This main container now handles the vertical and horizontal centering */}
      <main style={styles.heroSection}>
        {/* Left Column: Your Original Text Content */}
        <div style={styles.contentSide}>
          <p style={styles.topBadge}>AI INTERVIEW ASSISTANT</p>

          <h1 style={styles.title}>
            MockHire AI
          </h1>

          <p style={styles.subtitle}>
            Step into a high-fidelity 3D interview environment powered by LLaMA intelligence.
            Refine your voice, master your presence, and conquer the technical stage.
          </p>

          <div style={styles.buttonGroup}>
            <Link to="/login">
              <button style={styles.primaryBtn}>START INTERVIEW</button>
            </Link>
          </div>
        </div>

        {/* Right Column: Your Local Illustration */}
        <div style={styles.imageSide} >
          <img
            src="/mockhire-ai.png" // Pointing to your local file
            alt="MockHire AI Illustration"
            style={styles.heroImage}
          />
        </div>
      </main>

      {/* Social Proof Footer */}
      <section style={styles.brandsSection}>
        <p style={styles.brandsText}>Users landed roles at</p>
        <div style={styles.brandLogos}>
          <span style={styles.logoText}>Meta</span>
          <span style={styles.logoText}>Apple</span>
          <span style={styles.logoText}>Google</span>
          <span style={styles.logoText}>Amazon</span>
          <span style={styles.logoText}>Nike</span>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#fff",
    minHeight: "100vh", // Full screen height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centers content vertically
    alignItems: "center",     // Centers content horizontally
    overflowX: "hidden",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    width: "100%",
    padding: "0 40px",
    gap: "60px",
    flex: 1, // Allows the hero to take up the central space
  },
  contentSide: {
    flex: 1,
    textAlign: "left",
  },
  topBadge: {
    color: "#2563eb",
    fontWeight: "800",
    fontSize: "14px",
    letterSpacing: "1.5px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "72px",
    fontWeight: "900",
    lineHeight: "1.1",
    color: "#0f172a",
    margin: "0 0 25px 0",
    letterSpacing: "-2px",
  },
  subtitle: {
    fontSize: "19px",
    lineHeight: "1.6",
    color: "#475569",
    marginBottom: "40px",
    maxWidth: "500px",
  },
  primaryBtn: {
    padding: "16px 36px",
    fontSize: "15px",
    fontWeight: "700",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  imageSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    maxWidth: "550px",
    height: "auto",
  },
  brandsSection: {
    width: "100%",
    textAlign: "center",
    paddingBottom: "40px", // Keeps some space at the very bottom
  },
  brandsText: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "20px",
  },
  brandLogos: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    opacity: 0.5,
    filter: "grayscale(100%)",
    fontWeight: "bold",
    fontSize: "20px",
  },
  logoText: {
    color: "#334155",
  }
};