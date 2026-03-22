class ApprovalSystem:

    def request(self, rule):

        print("📌 Rule sent for approval queue")

        return {
            "status": "pending",
            "rule": rule
        }