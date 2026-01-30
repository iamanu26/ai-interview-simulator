import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2>🎤 AI Interview Simulator</h2>
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">What We Do</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>


        {token && <Link to="/interview">Interview</Link>}

        {token ? (
          <button onClick={logout} style={styles.logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: "#0f172a",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
