import { useState } from "react";
import { motion } from "framer-motion";

export default function AIEngine() {

  const [output, setOutput] = useState("");

  const simulate = (step) => {

    if (step === "detect") {
      setOutput("🚨 Attack Detected: SSH Bruteforce from 192.168.1.10");
    }

    if (step === "analyze") {
      setOutput("🔍 Pattern Analysis: Multiple login failures detected → Possible brute-force attack");
    }

    if (step === "risk") {
      setOutput("📊 Risk Score: 🔴 CRITICAL (High probability of breach)");
    }

    if (step === "action") {
      setOutput("🛡️ Action Taken: Port 22 blocked + IP blacklisted");
    }
  };

  return (
    <div>

      <h1>🧠 AI Decision Engine</h1>

      <div style={styles.flow}>

        <Step text="Attack Detected" onClick={() => simulate("detect")} />
        <Step text="Analyze Pattern" onClick={() => simulate("analyze")} />
        <Step text="Risk Scoring" onClick={() => simulate("risk")} />
        <Step text="Auto Action" onClick={() => simulate("action")} />

      </div>

      {/* OUTPUT PANEL */}
      <motion.div
        key={output}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.output}
      >
        {output}
      </motion.div>

    </div>
  );
}

function Step({ text, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={styles.step}
    >
      {text}
    </motion.div>
  );
}

const styles = {
  flow: {
    display: "flex",
    gap: "20px",
    marginTop: "40px"
  },
  step: {
    background: "#334155",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer"
  },
  output: {
    marginTop: "40px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "18px"
  }
};