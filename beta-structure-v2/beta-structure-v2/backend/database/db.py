import sqlite3

conn = sqlite3.connect("attacks.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS attacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant TEXT,
    type TEXT,
    port INTEGER,
    risk TEXT,
    score INTEGER
)
""")

def save_attack(data, tenant="default"):

    cursor.execute(
        "INSERT INTO attacks (tenant, type, port, risk, score) VALUES (?, ?, ?, ?, ?)",
        (
            tenant,
            data["attack"]["type"],
            data["attack"]["target_port"],
            str(data["ai"]),
            data["score"]
        )
    )

    conn.commit()


def get_attacks():
    cursor.execute("SELECT * FROM attacks ORDER BY id DESC")
    return cursor.fetchall()