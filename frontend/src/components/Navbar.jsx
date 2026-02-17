// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MockHire AI</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">HOME</Link>
        <Link style={styles.link} to="/about">ABOUT</Link>
        
        {token ? (
          <>
            <Link style={styles.link} to="/interview">INTERVIEW</Link>
            <button onClick={logout} style={styles.logout}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">LOGIN</Link>
            {/* ADDED REGISTER BACK HERE */}
            <Link style={styles.registerBtn} to="/register">REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 60px",
    background: "transparent",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "900",
    color: "#fff",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "12px",
    letterSpacing: "2px",
    transition: "color 0.3s",
  },
  registerBtn: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "2px",
    padding: "8px 20px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
  },
  logout: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    padding: "8px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  }
};

export default Navbar;