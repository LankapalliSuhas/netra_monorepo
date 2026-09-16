import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import settings
from api.websocket import router as websocket_router
from core.simulation_engine import simulation_engine

app = FastAPI(title="NETRA Edge MVP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(settings.router, prefix="/api/settings")
app.include_router(websocket_router, prefix="/ws")

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulation_engine.run())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
