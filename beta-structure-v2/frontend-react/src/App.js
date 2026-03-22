import { useState } from "react";

import Dashboard from "./pages/Dashboard";

import Agents from "./pages/Agents";
import AIEngine from "./pages/AIEngine";

import Simulation from "./pages/Simulation";
import Overview from "./pages/Overview";



export default function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>🛡️ AI</h2>

        <NavBtn text="Dashboard" onClick={() => setPage("dashboard")} />
          <NavBtn text="Simulation" onClick={() => setPage("sim")} />
       
        <NavBtn text="Agents" onClick={() => setPage("agents")} />
        <NavBtn text="AI Engine" onClick={() => setPage("ai")} />
           <NavBtn text="Overview" onClick={() => setPage("overview")} />
        
      
        
        
      </div>

      {/* Content */}
      <div style={styles.content}>

        {page === "dashboard" && <Dashboard />}
        {page === "overview" && <Overview />}
        {page === "agents" && <Agents />}
        {page === "ai" && <AIEngine />}
    
        {page === "sim" && <Simulation />}
       
        

      </div>
    </div>
  );
}

// 🔘 Sidebar button
function NavBtn({ text, onClick }) {
  return (
    <button onClick={onClick} style={styles.btn}>
      {text}
    </button>
  );
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial"
  },
  sidebar: {
    width: "220px",
    background: "#040915",
    color: "white",
    padding: "20px",
    height: "133vh"
  },
  content: {
    flex: 1,
    background: "#040915",
    color: "white",
    padding: "20px"
  },
  btn: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};