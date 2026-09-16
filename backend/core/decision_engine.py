import uuid
import time

class DecisionEngine:
    def __init__(self):
        pass
        
    def evaluate_inventory(self, shelves):
        actions = []
        for shelf in shelves:
            if shelf.current_stock <= shelf.reorder_threshold:
                severity = "CRITICAL" if shelf.current_stock == 0 else "WARNING"
                action = {
                    "action_id": f"act_{uuid.uuid4().hex[:8]}",
                    "severity": severity,
                    "source": "INVENTORY_DECISION_ENGINE",
                    "message": f"RESTOCK REQUIRED: '{shelf.product.name}' at Shelf {shelf.shelf_id} dropped below threshold ({shelf.current_stock} left).",
                    "timestamp": int(time.time()),
                    "acknowledged": False
                }
                actions.append(action)
        return actions

    def evaluate_queue(self, queue_length, avg_items_per_cart=0):
        actions = []
        # ETA_minutes = (queue_length * (45.0 + (5.0 * avg_items_per_cart))) / 60.0
        # Given in prompt: ETA = (queue_length * 50) / 60
        eta_minutes = (queue_length * 50) / 60.0
        if eta_minutes > 4.0:
            action = {
                "action_id": f"act_{uuid.uuid4().hex[:8]}",
                "severity": "WARNING",
                "source": "QUEUE_DECISION_ENGINE",
                "message": f"QUEUE SURGE: ETA exceeds 4.0 min (Est: {eta_minutes:.1f} min). Open Counter 2 immediately.",
                "timestamp": int(time.time()),
                "acknowledged": False
            }
            actions.append(action)
        return actions
