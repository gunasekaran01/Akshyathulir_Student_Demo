from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.expert_profile_routes import router
from routes.expert_dashboard_routes import router as dashboard_router
from routes.expert_mentees_routes import router as mentees_router
from routes.expert_revenue_routes import router as revenue_router
from routes.expert_availability_routes import router as availability_router
from routes.expert_resource_routes import router as resource_router
from routes.expert_rating_routes import router as rating_router
from routes.expert_ads_routes import router as ads_router
from routes.expert_booking_routes import router as booking_router
from routes.expert_user_routes import router as user_router
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
app.include_router(rating_router)
app.include_router(ads_router)
app.include_router(booking_router)
app.include_router(user_router)
# ---------------- TEST ----------------
@app.get("/")
def root():
    return {"message": "Backend running successfully"}
