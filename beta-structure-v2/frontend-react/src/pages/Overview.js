import { motion } from "framer-motion";

export default function Overview() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🔄 AI Cyber Defense Flow</h1>

      <div style={styles.flow}>

        <Step
          title="🔴 Attack Simulation"
          desc="Simulated cyber attacks like DDoS, malware, phishing"
          image="https://media.istockphoto.com/id/1455952390/photo/system-hacked-warning-alert-on-notebook-cyber-attack-on-computer-network-virus-spyware.jpg?s=612x612&w=0&k=20&c=o8wQYr8yJlLoObVAKJELWjOjbZRXlAmLBeYCPr-1e2E="
          delay={0}
          color="#ef4444"
        />

        <Connection delay={0.3} />

        <Step
          title="🧠 AI Brain"
          desc="Analyzes patterns and predicts threats"
          image="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QUklMjBicmFpbnxlbnwwfHwwfHx8MA%3D%3D"
          delay={0.4}
          color="#3b82f6"
        />

        <Connection delay={0.7} />

        <Step
          title="🔵 Defense System"
          desc="AI agents coordinate response actions"
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
          delay={0.8}
          color="#22c55e"
        />

        <Connection delay={1.1} />

        <Step
          title="🛡️ Firewall Protection"
          desc="Blocks threats and secures infrastructure"
          image="https://images.unsplash.com/photo-1563986768609-322da13575f3"
          delay={1.2}
          color="#a855f7"
        />

      </div>
    </div>
  );
}

/* 🔥 STEP */
function Step({ title, desc, image, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      style={{
        ...styles.card,
        boxShadow: `0 0 25px ${color}30`
      }}
    >
      <div style={styles.imageWrapper}>
        <img src={image} alt="" style={styles.image} />
      </div>

      <h3>{title}</h3>
      <p style={styles.desc}>{desc}</p>
    </motion.div>
  );
}

/* ⚡ CONNECTION WITH FLOW ANIMATION */
function Connection({ delay }) {
  return (
    <div style={styles.connection}>
      {/* line */}
      <div style={styles.line} />

      {/* moving energy */}
      <motion.div
        style={styles.pulse}
        initial={{ x: 0 }}
        animate={{ x: 80 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          delay
        }}
      />
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "30px",
    color: "white"
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px"
  },

  flow: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  card: {
    width: "260px",
    background: "linear-gradient(145deg, #0f172a, #1e293b)",
    borderRadius: "16px",
    padding: "15px",
    border: "1px solid #334155",
    transition: "0.3s"
  },

  imageWrapper: {
    overflow: "hidden",
    borderRadius: "10px",
    marginBottom: "10px"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  desc: {
    fontSize: "13px",
    color: "#94a3b8"
  },

  connection: {
    position: "relative",
    width: "80px",
    height: "4px"
  },

  line: {
    width: "100%",
    height: "4px",
    background: "#334155",
    borderRadius: "2px"
  },

  pulse: {
    position: "absolute",
    top: "-4px",
    width: "12px",
    height: "12px",
    background: "#ef4444",
    borderRadius: "50%"
  }
};