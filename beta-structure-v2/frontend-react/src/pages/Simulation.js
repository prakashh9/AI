import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const scenarios = ["DDoS", "Malware", "Phishing"];

export default function Simulation() {
  const [scenario, setScenario] = useState("DDoS");
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState({
    traffic: "Normal",
    threat: "Low",
    firewall: "Active",
    system: "Secure"
  });

  /* 🔥 LIVE LOGS + STATUS CHANGE */
  useEffect(() => {
    const interval = setInterval(() => {
      const log = generateLog(scenario);

      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ${log}`,
        ...prev.slice(0, 5)
      ]);

      updateStatus(scenario, setStatus); // ✅ correct usage
    }, 2000);

    return () => clearInterval(interval);
  }, [scenario]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚡ AI Attack Simulation</h1>

      {/* 🎛️ SCENARIO SWITCH */}
      <div style={styles.controls}>
        {scenarios.map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            style={{
              ...styles.btn,
              background: scenario === s ? "#6366f1" : "#1e293b"
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 🎴 STATUS CARDS */}
      <div style={styles.cards}>
        <Card title="🌐 Traffic" value={status.traffic} />
        <Card title="🚨 Threat Level" value={status.threat} />
        <Card title="🛡 Firewall" value={status.firewall} />
        <Card title="💻 System" value={status.system} />
      </div>

      {/* 🧠 GRAPH */}
      <div style={styles.graph}>
        <Node label="Attacker" icon="🔴" top="50%" left="5%" />
        <Node label="AI Engine" icon="🧠" top="20%" left="40%" />
        <Node label="Firewall" icon="🛡️" top="70%" left="40%" />
        <Node label="Server" icon="🖥️" top="50%" left="75%" />
      </div>

      {/* 📡 LOG PANEL */}
      <div style={styles.logs}>
        <h3>📡 Live Activity</h3>
        {logs.map((log, i) => (
          <p key={i} style={styles.logItem}>
            {log}
          </p>
        ))}
      </div>
    </div>
  );
}

/* 🎴 CARD */
function Card({ title, value }) {
  return (
    <motion.div
      style={styles.card}
      whileHover={{ scale: 1.05 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      <h4>{title}</h4>
      <p>{value}</p>
    </motion.div>
  );
}

/* 🧠 NODE */
function Node({ label, icon, top, left }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      style={{
        ...styles.node,
        top,
        left
      }}
    >
      <div style={styles.icon}>{icon}</div>
      <p>{label}</p>
    </motion.div>
  );
}

/* 🔥 STATUS LOGIC */
function updateStatus(scenario, setStatus) {
  switch (scenario) {
    case "DDoS":
      setStatus({
        traffic: "High",
        threat: "Critical",
        firewall: "Rate Limiting",
        system: "Under Load"
      });
      break;

    case "Malware":
      setStatus({
        traffic: "Normal",
        threat: "High",
        firewall: "Scanning",
        system: "Compromised"
      });
      break;

    case "Phishing":
      setStatus({
        traffic: "Normal",
        threat: "Medium",
        firewall: "Filtering",
        system: "At Risk"
      });
      break;

    default:
      break;
  }
}

/* 🔥 LOG GENERATOR */
function generateLog(scenario) {
  const logs = {
    DDoS: [
      "Mass traffic spike detected",
      "Firewall rate limiting applied",
      "AI mitigating attack"
    ],
    Malware: [
      "Suspicious file execution",
      "Endpoint compromised",
      "Threat quarantined"
    ],
    Phishing: [
      "Suspicious login attempt",
      "Credential anomaly detected",
      "Access blocked"
    ]
  };

  const arr = logs[scenario];
  return arr[Math.floor(Math.random() * arr.length)];
}

/* 🎨 STYLES */
const styles = {
  page: { padding: "30px", color: "white" },

  title: { fontSize: "30px", marginBottom: "20px" },

  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer"
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px"
  },

  card: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  graph: {
    position: "relative",
    height: "400px",
    border: "1px solid #334155",
    borderRadius: "16px",
    marginBottom: "20px"
  },

  node: {
    position: "absolute",
    width: "120px",
    height: "120px",
    background: "#0f172a",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #334155"
  },

  icon: { fontSize: "28px" },

  logs: {
    background: "#020617",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  logItem: {
    fontSize: "13px",
    color: "#94a3b8"
  }
};