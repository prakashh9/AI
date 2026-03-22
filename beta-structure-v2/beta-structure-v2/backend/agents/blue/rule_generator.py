class RuleGenerator:

    def generate(self, data):

        attack = data["data"]["data"]["data"]

        return {
            "action": "block",
            "port": attack["target_port"],
            "reason": attack["type"]
        }