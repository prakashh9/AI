pending_rules = []

def add_rule(rule):
    pending_rules.append(rule)

def get_rules():
    return pending_rules

def approve_rule(index):
    if index < len(pending_rules):
        return pending_rules.pop(index)
    return None