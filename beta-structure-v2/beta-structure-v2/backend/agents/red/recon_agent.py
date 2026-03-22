import random

class ReconAgent:

    def scan(self):

        attack = {
            "type": random.choice(["port_scan", "ssh_bruteforce", "dns_tunnel"]),
            "source_ip": f"192.168.1.{random.randint(1,255)}",
            "target_port": random.randint(20,9000)
        }

        print("Recon:", attack)

        return attack