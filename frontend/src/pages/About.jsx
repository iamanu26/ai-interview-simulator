export default function About() {
  return (
    <div style={styles.container}>
      <h1>About Us</h1>
      <p>
        Many students struggle with interviews due to lack of real practice,
        confidence, and proper feedback.
      </p>
      <p>
        Our AI Interview Simulator provides a realistic interview environment
        where users can practice HR and Technical interviews using AI-driven
        interviewers.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px",
    maxWidth: "800px",
    margin: "auto",
    lineHeight: "1.8",
  },
};
