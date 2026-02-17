import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set the video playback speed to 0.7x (slightly slower)
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* 1. Background Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={styles.backgroundVideo}
      >
        <source src="/Video.Guru_20260218_003548702.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay Layer (Ensures text remains readable) */}
      <div style={styles.overlay}></div>

      {/* 3. Hero Content Layer */}
      <div className="glass-card animate-float" style={styles.heroCard}>
        <div style={styles.badge}>NEXT-GEN AI</div>
        
        <h1 className="text-gradient" style={styles.title}>
          MockHire AI
        </h1>
        
        <p style={styles.subtitle}>
          Step into a high-fidelity 3D interview environment powered by LLaMA intelligence. 
          Refine your voice, master your presence, and conquer the technical stage.
        </p>

        <div style={styles.buttons}>
          <Link to="/login">
            <button style={styles.primary}>START INTERVIEW</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1200px",
    position: "fixed", // Keeps background stable
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  backgroundVideo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: -2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(2, 6, 23, 0.5)", // Adjust opacity here if video is too bright
    zIndex: -1,
  },
  heroCard: {
    padding: "80px 60px",
    maxWidth: "800px",
    textAlign: "center",
    zIndex: 10,
  },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "30px",
    background: "rgba(37, 99, 235, 0.15)",
    color: "#60a5fa",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "30px",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },
  title: {
    fontSize: "84px",
    fontWeight: "900",
    margin: "0 0 20px 0",
    letterSpacing: "-4px",
    lineHeight: "0.9",
    color: "#fff",
  },
  subtitle: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#cbd5e1",
    marginBottom: "50px",
    maxWidth: "550px",
    marginInline: "auto",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  primary: {
    padding: "18px 48px",
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "1px",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    color: "white",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.5)",
    transition: "transform 0.2s ease",
  },
};