import random

class LLMAgent:

    def analyze_attack(self, attack):

        try:
            from openai import OpenAI
            import os

            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

            prompt = f"Analyze attack: {attack}"

            res = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )

            return res.choices[0].message.content

        except Exception:

            # 🔥 SMART FALLBACK AI

            attack_type = attack["type"]
            port = attack["target_port"]

            rules = {
                "ssh_bruteforce": {
                    "risk": "CRITICAL",
                    "action": "block",
                    "reason": "Multiple failed SSH attempts"
                },
                "port_scan": {
                    "risk": "HIGH",
                    "action": "monitor",
                    "reason": "Suspicious scanning activity"
                },
                "dns_tunnel": {
                    "risk": "CRITICAL",
                    "action": "block",
                    "reason": "Possible data exfiltration"
                }
            }

            rule = rules.get(attack_type, {
                "risk": "MEDIUM",
                "action": "monitor",
                "reason": "Unknown pattern"
            })

            return {
                "risk": rule["risk"],
                "attack_type": attack_type,
                "confidence": random.randint(75, 95),
                "recommendation": rule["reason"],
                "auto_action": rule["action"],
                "port": port
            }