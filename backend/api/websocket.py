import asyncio
import time
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from db.session import AsyncSessionLocal
from db.models import Shelf, Product
from core.simulation_engine import simulation_engine
from core.decision_engine import DecisionEngine

router = APIRouter()
decision_engine = DecisionEngine()

@router.websocket("/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            async with AsyncSessionLocal() as db:
                result = await db.execute(select(Shelf).options(selectinload(Shelf.product)))
                shelves_db = result.scalars().all()
                
                # Format shelves
                shelves_data = []
                for shelf in shelves_db:
                    shelves_data.append({
                        "product_id": shelf.product_id,
                        "name": shelf.product.name if shelf.product else "Unknown",
                        "shelf_id": shelf.shelf_id,
                        "is_physical_node": shelf.is_physical_node,
                        "current_stock": shelf.current_stock,
                        "reorder_threshold": shelf.reorder_threshold,
                        "status": "CRITICAL" if shelf.current_stock <= shelf.reorder_threshold else "OK"
                    })
                
                inventory_actions = decision_engine.evaluate_inventory(shelves_db)
                queue_actions = decision_engine.evaluate_queue(simulation_engine.queue_length, 2) # assuming avg items is 2
                
                all_actions = inventory_actions + queue_actions
                
                payload = {
                    "system": {
                        "mode": simulation_engine.system_mode,
                        "timestamp": int(time.time())
                    },
                    "store_metrics": {
                        "current_occupancy": 15 # Mocked for MVP
                    },
                    "queue_intelligence": {
                        "people_in_queue": simulation_engine.queue_length,
                        "estimated_wait_time_minutes": (simulation_engine.queue_length * 50) / 60.0
                    },
                    "shelves": shelves_data,
                    "active_actions": all_actions
                }
                
                await websocket.send_json(payload)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Client disconnected")
