# backend/firewall/engine.py

class FirewallEngine:

    def __init__(self):
        self.rules = []

    def apply_rule(self, rule):

        self.rules.append(rule)

        print("Firewall updated:", rule)