from fastapi import FastAPI
from backend.core.orchestrator import Orchestrator

from backend.approval.pending_store import get_rules, approve_rule
from backend.logs.logs_store import get_logs
from backend.database.db import get_attacks
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

orch = Orchestrator()


@app.get("/")
def home():
    return {"status": "Phase 3 Running"}


@app.get("/run/{tenant}")
def run(tenant: str):
    return orch.run_cycle(tenant)


@app.get("/pending")
def pending():
    return get_rules()


@app.post("/approve/{index}")
def approve(index: int):

    rule = approve_rule(index)
    orch.firewall.apply_rule(rule)

    return {"status": "approved", "rule": rule}


@app.get("/logs")
def logs():
    return get_logs()


@app.get("/history")
def history():
    return get_attacks()

from backend.analytics.stats import attacks_by_type

@app.get("/stats/type")
def stats_type():
    return attacks_by_type()
users = {
    "admin": "123"
}

@app.post("/login")
def login(username: str, password: str):

    if username == "admin" and password == "123":
        return {"status": "success", "tenant": username}

    return {"status": "fail"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)