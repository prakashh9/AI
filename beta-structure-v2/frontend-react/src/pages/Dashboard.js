import { useEffect, useState } from "react";
import axios from "axios";
import Charts from "../components/Charts";

const API = "http://localhost:8000";

export default function Dashboard() {

  const [tenant] = useState("admin");
  const [logs, setLogs] = useState([]);
  const [chart, setChart] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [approved, setApproved] = useState(false);
  const [defenseMsg, setDefenseMsg] = useState("");

  // 🔊 SOUND
  const playAlert = () => {
  try {
    const audio = new Audio(process.env.PUBLIC_URL + "/sounds/beep.wav");
    audio.volume = 0.7;

    audio.play().then(() => {
      console.log("Sound played");
    }).catch(err => {
      console.log("Audio blocked:", err);
    });

  } catch (e) {
    console.log("Audio error:", e);
  }
};


  // 🚀 RUN ATTACK
  const run = async () => {
  setLoading(true);

  // 🔥 trigger alert + sound ONLY here
  setAlert(true);
  playAlert();

  setTimeout(() => {
  setAlert(false);
}, 15000);

  setApproved(false);
  setDefenseMsg("");

  await axios.get(`${API}/run/${tenant}`);
  await loadData();

  setLoading(false);
};

  // 📊 LOAD DATA
  const loadData = async () => {
    try {
      const logsRes = await axios.get(`${API}/logs`);
      const logsData = logsRes.data || [];

      setLogs(logsData);

      
      

      // 📊 Chart
      const labels = ["ssh", "scan", "dns"];
      const values = [
        logsData.filter(l => l.includes("ssh")).length,
        logsData.filter(l => l.includes("scan")).length,
        logsData.filter(l => l.includes("dns")).length
      ];

      setChart({
        labels,
        datasets: [{ data: values }]
      });

    } catch (err) {
      console.error(err);
    }
  };

  // 🧠 HUMAN APPROVAL FLOW
  const approveDefense = () => {
    setApproved(true);

    setDefenseMsg("✅ Human Approval Granted");

    setTimeout(() => {
      setDefenseMsg("🛡️ Firewall Defense System Activated...");
    }, 2000);

    setTimeout(() => {
      setDefenseMsg("⚙️ Building Firewall Rules...");
    }, 3500);

  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>

      <h1>🛡️ Security Dashboard</h1>

      {/* 🔴 ALERT */}
      {alert && (
  <div style={styles.alert}>
    🚨 ATTACK DETECTED 🚨
  </div>
)}

      {/* 🚀 RUN BUTTON */}
      <button
        onClick={run}
        style={styles.runBtn}
        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
      >
        {loading ? "⏳ Running..." : "🚀 Run Attack"}
      </button>

      {loading && <div style={styles.loader}></div>}

      {/* 🧠 APPROVAL SECTION */}
      {alert && !approved && (
        <button onClick={approveDefense} style={styles.approveBtnBig}>
          ✅ Approve Defense
        </button>
      )}

      {/* ⚙️ DEFENSE STATUS */}
      {approved && (
        <div style={styles.defenseBox}>
          {defenseMsg}
        </div>
      )}

      <div style={styles.grid}>

        {/* 📜 Logs */}
        <div style={styles.card}>
          <h2>📜 Logs</h2>
          {logs.slice(-10).map((l, i) => (
            <p key={i} style={getLogStyle(l)}>
              {l}
            </p>
          ))}
        </div>

        {/* 📊 Charts */}
        <div style={styles.card}>
          <h2>📊 Attack Trends</h2>
          <Charts data={chart} />
        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    padding: "30px",
    background: "#020617",
    minHeight: "100vh",
    color: "white"
  },
  runBtn: {
    background: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    padding: "14px 30px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "15px"
  },
  approveBtnBig: {
    background: "green",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  defenseBox: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "18px"
  },
  loader: {
    border: "4px solid #1e293b",
    borderTop: "4px solid cyan",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    background: "rgba(30,41,59,0.6)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px"
  },
  alert: {
    background: "red",
    padding: "15px",
    textAlign: "center",
    fontWeight: "bold",
    animation: "blink 1s infinite"
  }
};

function getLogStyle(log) {
  if (log.includes("CRITICAL")) return { color: "red" };
  if (log.includes("HIGH")) return { color: "orange" };
  if (log.includes("MEDIUM")) return { color: "yellow" };
  return {};
}