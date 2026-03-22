from backend.agents.red.recon_agent import ReconAgent
from backend.agents.red.exploit_agent import ExploitAgent
from backend.agents.red.lateral_agent import LateralAgent
from backend.agents.red.evasion_agent import EvasionAgent

from backend.agents.blue.rule_generator import RuleGenerator
from backend.agents.blue.optimizer import Optimizer
from backend.agents.blue.compliance_agent import ComplianceAgent

from backend.firewall.engine import FirewallEngine
from backend.approval.approval_system import ApprovalSystem

from backend.logs.logs_store import add_log
from backend.database.db import save_attack

from ai.llm_agent import LLMAgent


class Orchestrator:

    def __init__(self):

        # 🔴 RED TEAM
        self.recon = ReconAgent()
        self.exploit = ExploitAgent()
        self.lateral = LateralAgent()
        self.evasion = EvasionAgent()

        # 🔵 BLUE TEAM
        self.rule_gen = RuleGenerator()
        self.optimizer = Optimizer()
        self.compliance = ComplianceAgent()

        # 🧠 AI
        self.ai = LLMAgent()

        # ⚙️ SYSTEM
        self.firewall = FirewallEngine()
        self.approval = ApprovalSystem()

    def run_cycle(self, tenant="default"):

        print("\n=== 🔴 RED TEAM ===")

        attack = self.recon.scan()
        exploit = self.exploit.execute(attack)
        lateral = self.lateral.move(exploit)
        evasion = self.evasion.evade(lateral)

        add_log(f"Attack: {attack}")

        print("\n=== 🧠 AI ===")

        ai_result = self.ai.analyze_attack(attack)
        print("AI:", ai_result)

        add_log(f"AI: {ai_result.get('risk')} - {ai_result}")

        print("\n=== 🔵 BLUE TEAM ===")

        rule = self.rule_gen.generate(evasion)
        optimized = self.optimizer.optimize(rule)
        compliant = self.compliance.check(optimized)

        add_log(f"Rule: {compliant}")

        # 🔥 AUTO DEFENSE (CORRECT POSITION)
        print("\n=== 🛡️ AUTO DEFENSE ===")

        if isinstance(ai_result, dict):

            if ai_result.get("auto_action") == "block":
                print("🚫 Auto-blocking port:", ai_result.get("port"))

                self.firewall.apply_rule({
                    "action": "block",
                    "port": ai_result.get("port"),
                    "reason": ai_result.get("recommendation")
                })

                add_log(f"🔥 AUTO BLOCK: Port {ai_result.get('port')}")

            else:
                print("👁️ Monitoring traffic...")
                add_log("👁️ Monitoring traffic")

        print("\n=== 📊 SCORE ===")

        score = 20
        add_log(f"Score: {score}")

        save_attack({
            "attack": attack,
            "ai": ai_result,
            "score": score
        }, tenant)

        return {
            "attack": attack,
            "rule": compliant,
            "score": score,
            "ai": ai_result,
            "status": "auto"
        }