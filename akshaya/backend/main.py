from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.expert_routes import router
from routes.dashboard_routes import router as dashboard_router
from routes.mentees_routes import router as mentees_router
from routes.revenue_routes import router as revenue_router
from routes.availability_routes import router as availability_router
from routes.resource_routes import router as resource_router
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
app.include_router(mentees_router)
app.include_router(availability_router)
app.include_router(resource_router)
app.include_router(revenue_router)
# ---------------- TEST ----------------
@app.get("/")
def root():
    return {"message": "Backend running successfully"}
