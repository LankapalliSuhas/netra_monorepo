import asyncio
import random
from sqlalchemy import select
from db.session import AsyncSessionLocal
from db.models import Shelf

class SimulationEngine:
    def __init__(self):
        self.system_mode = "LIVE"
        self.queue_length = 0

    async def run(self):
        while True:
            await asyncio.sleep(3)
            if self.system_mode == "SIMULATED":
                async with AsyncSessionLocal() as db:
                    # Randomly pick 1-3 virtual shelves
                    result = await db.execute(select(Shelf).where(Shelf.is_physical_node == False))
                    virtual_shelves = result.scalars().all()
                    
                    if virtual_shelves:
                        num_to_update = random.randint(1, min(3, len(virtual_shelves)))
                        shelves_to_update = random.sample(virtual_shelves, num_to_update)
                        
                        for shelf in shelves_to_update:
                            if shelf.current_stock > 0:
                                shelf.current_stock -= 1
                                
                    # Spikes queue count
                    self.queue_length = random.randint(0, 10)
                    
                    await db.commit()
            else:
                pass
                
simulation_engine = SimulationEngine()
