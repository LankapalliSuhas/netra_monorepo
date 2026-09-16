from fastapi import APIRouter
from pydantic import BaseModel
from core.simulation_engine import simulation_engine

router = APIRouter()

class ModeToggleRequest(BaseModel):
    mode: str

@router.post("/mode")
async def toggle_mode(request: ModeToggleRequest):
    if request.mode in ["LIVE", "SIMULATED"]:
        simulation_engine.system_mode = request.mode
        return {"status": "success", "mode": request.mode}
    return {"status": "error", "message": "Invalid mode"}
