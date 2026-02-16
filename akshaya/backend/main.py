from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.expert_routes import router
from routes.dashboard_routes import router as dashboard_router
app = FastAPI()
# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- STATIC FILES ----------------
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# ---------------- ROUTES ----------------
app.include_router(router)
app.include_router(dashboard_router)
# ---------------- TEST ----------------
@app.get("/")
def root():
    return {"message": "Backend running successfully"}
