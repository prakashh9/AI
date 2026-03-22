import sqlite3

conn = sqlite3.connect("attacks.db", check_same_thread=False)
cursor = conn.cursor()

def attacks_by_type():
    cursor.execute("SELECT type, COUNT(*) FROM attacks GROUP BY type")
    return cursor.fetchall()

def attacks_over_time():
    cursor.execute("SELECT date(createdAt), COUNT(*) FROM attacks GROUP BY date(createdAt)")
    return cursor.fetchall()