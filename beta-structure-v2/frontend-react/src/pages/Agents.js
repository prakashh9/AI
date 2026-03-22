import { motion } from "framer-motion";

/* 🔵 DEFENSE (ALPHA) */
const alphaAgents = [
  { name: "Network Guardian", icon: "🧠", desc: "Orchestrates all agents" },
  { name: "Endpoint Sentinel", icon: "💻", desc: "Protects endpoints" },
  { name: "Identity Warden", icon: "🔐", desc: "Monitors access" },
  { name: "Data Protector", icon: "📂", desc: "Prevents data leaks" }
];

/* 🔴 ATTACK (BETA) */
const betaAgents = [
  { name: "Recon Agent", icon: "🕵️", desc: "Scans vulnerabilities" },
  { name: "Exploit Agent", icon: "💣", desc: "Breaks security" },
  { name: "Lateral Movement", icon: "🔁", desc: "Spreads internally" },
  { name: "Evasion Agent", icon: "📤", desc: "Stealth & exfiltration" }
];

/* 🟣 BUILDER (BLUE TEAM ENGINEERING) */
const builderAgents = [
  { name: "Rule Generator", icon: "⚙️", desc: "Creates firewall rules" },
  { name: "Optimizer", icon: "🧪", desc: "Improves performance" },
  { name: "Compliance Agent", icon: "📜", desc: "Ensures regulations" }
];

export default function Agents() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ AI Agent Ecosystem</h1>

      {/* 🔵 ALPHA */}
      <Section
        title="🔵 ALPHA SYSTEM (Defense AI)"
        agents={alphaAgents}
        cardStyle={styles.alphaCard}
      />

      {/* 🔴 BETA */}
      <Section
        title="🔴 BETA SYSTEM (Adversarial AI)"
        agents={betaAgents}
        cardStyle={styles.betaCard}
        animatePulse
      />

      {/* 🟣 BUILDER */}
      <Section
        title="🟣 BUILDER SYSTEM (AI Engineering)"
        agents={builderAgents}
        cardStyle={styles.builderCard}
      />
    </div>
  );
}

/* 🔧 REUSABLE SECTION COMPONENT */
function Section({ title, agents, cardStyle, animatePulse }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>

      <div style={styles.grid}>
        {agents.map((agent, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            animate={
              animatePulse
                ? { opacity: [0.85, 1, 0.85] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ ...styles.card, ...cardStyle }}
          >
            <span style={styles.icon}>{agent.icon}</span>
            <h3>{agent.name}</h3>
            <p>{agent.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "30px",
    color: "white"
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px"
  },

  section: {
    marginBottom: "40px"
  },

  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #334155",
    backdropFilter: "blur(10px)",
    transition: "0.3s"
  },

  alphaCard: {
    background: "linear-gradient(145deg, #0f172a, #1e3a8a)",
    boxShadow: "0 0 20px rgba(96,165,250,0.2)"
  },

  betaCard: {
    background: "linear-gradient(145deg, #1f0a0a, #7f1d1d)",
    boxShadow: "0 0 20px rgba(224, 28, 28, 0.95)"
  },

  builderCard: {
    background: "linear-gradient(145deg, #1a102a, #581c87)",
    boxShadow: "0 0 20px rgba(168,85,247,0.3)"
  },

  icon: {
    fontSize: "26px"
  }
};