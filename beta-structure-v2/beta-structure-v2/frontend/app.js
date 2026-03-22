const API = "http://127.0.0.1:8000"

// 🚀 Run attack
async function run() {

    const res = await fetch(`${API}/run/default`)
    const data = await res.json()

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2)

    loadPending()
    loadLogs()
}

// 📌 Load pending rules
async function loadPending() {

    const res = await fetch(`${API}/pending`)
    const data = await res.json()

    let html = ""

    data.forEach((rule, index) => {
        html += `
        <div>
          ${JSON.stringify(rule)}
          <button onclick="approve(${index})">Approve</button>
        </div><hr>`
    })

    document.getElementById("pending").innerHTML = html
}

<h2>🧠 AI Insights</h2>
{logs.slice(-5).map((l, i) => <p key={i}>{l}</p>)}

// ✅ Approve rule
async function approve(index) {

    await fetch(`${API}/approve/${index}`, {
        method: "POST"
    })

    loadPending()
    loadLogs()
}

// 📜 Load logs
async function loadLogs() {

    const res = await fetch(`${API}/logs`)
    const data = await res.json()

    let html = ""

    data.slice(-20).forEach(log => {
        html += `<p>> ${log}</p>`
    })

    document.getElementById("logs").innerHTML = html
}

// 📊 Load charts
async function loadCharts() {

    const res = await fetch(`${API}/stats/type`)
    const data = await res.json()

    const labels = data.map(d => d[0])
    const values = data.map(d => d[1])

    const ctx = document.getElementById("chart")

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Attack Types",
                data: values
            }]
        }
    })
}

// 🔄 AUTO REFRESH
setInterval(() => {
    loadLogs()
    loadPending()
}, 5000)