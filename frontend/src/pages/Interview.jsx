import { useState, useRef } from "react";

export default function Interview() {
  const [type, setType] = useState("tech");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(
    "Welcome! Please introduce yourself."
  );
  const [status, setStatus] = useState("Idle");
  const [loading, setLoading] = useState(false);
  const [interviewState, setInterviewState] = useState("idle");
  // idle | running | paused | ended

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition once
  if (!recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "en-US";
      recog.continuous = false;
      recognitionRef.current = recog;
    }
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    if (interviewState === "paused" || interviewState === "ended") return;

    setInterviewState("running");
    setStatus("Listening...");
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setAnswer(speechText);
      setStatus("Processing...");
      askQuestion(speechText);
    };
  };

  const speak = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  const askQuestion = async (userAnswer) => {
    setLoading(true);

    const endpoint =
      type === "tech"
        ? "http://127.0.0.1:8000/interview/tech"
        : "http://127.0.0.1:8000/interview/hr";

    try {
      const res = await fetch(`${endpoint}?answer=${encodeURIComponent(userAnswer)}`, {
        method: "POST",
      });

      const data = await res.json();
      setQuestion(data.question);
      setStatus("Speaking...");
      speak(data.question);
    } catch (err) {
      alert("Error communicating with server");
    }

    setLoading(false);
  };

  // 🔴 Interview Controls

  const pauseInterview = () => {
    speechSynthesis.pause();
    setInterviewState("paused");
    setStatus("Paused");
  };

  const resumeInterview = () => {
    speechSynthesis.resume();
    setInterviewState("running");
    setStatus("Speaking...");
  };

  const stopInterview = async () => {
  speechSynthesis.cancel();
  recognitionRef.current?.abort();
  setInterviewState("ended");
  setStatus("Interview Ended");

  try {
    const token = localStorage.getItem("token");

    await fetch("http://127.0.0.1:8000/interview/stop", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Redirect ONLY after backend saves feedback
    navigate("/feedback");

  } catch (err) {
    console.error("Failed to stop interview", err);
  }
};


  return (
    <div style={styles.container}>
      <h1>🎤 Voice Interview Room</h1>

      <div style={styles.row}>
        <label>
          <input
            type="radio"
            checked={type === "tech"}
            onChange={() => setType("tech")}
          />
          Technical
        </label>

        <label>
          <input
            type="radio"
            checked={type === "hr"}
            onChange={() => setType("hr")}
          />
          HR
        </label>
      </div>

      <div style={styles.card}>
        <h3>Interviewer:</h3>
        <p>{question}</p>
      </div>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <button
        onClick={startListening}
        style={styles.button}
        disabled={loading || interviewState === "ended"}
      >
        🎙️ Speak Answer
      </button>

      {/* 🎛 Controls */}
      <div style={styles.controls}>
        <button
          onClick={pauseInterview}
          disabled={interviewState !== "running"}
        >
          ⏸ Pause
        </button>

        <button
          onClick={resumeInterview}
          disabled={interviewState !== "paused"}
        >
          ▶ Resume
        </button>

        <button onClick={stopInterview} style={styles.endBtn}>
          ❌ End Interview
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  button: {
    padding: "14px 28px",
    background: "#16a34a",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
  },
  controls: {
    marginTop: "20px",
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  endBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
