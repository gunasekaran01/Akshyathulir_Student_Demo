from fastapi import APIRouter
from controllers.expert_dashboard_controller import (
    save_dashboard_data_controller,
    get_dashboard_kpi_dashboard_controller,
    get_growth_trend_controller,
    get_revenue_trend_controller,
    get_PerformanceSummary_controller,
    get_StageDistribution_controller
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


# ---------------- INSERT / UPDATE DASHBOARD ----------------
@router.post("/save/{email}")
def save_dashboard(email: str, data: dict):
    return save_dashboard_data_controller(email, data)


# ---------------- GET SUMMARY ----------------
@router.get("/kpi_dashboard/{email}")
def get_kpi_dashboard(email: str):
    return get_dashboard_kpi_dashboard_controller(email)


# ---------------- GET GROWTH ----------------
@router.get("/growth/{email}")
def get_growth(email: str):
    return get_growth_trend_controller(email)


# ---------------- GET REVENUE ----------------
@router.get("/revenue/{email}")
def get_revenue(email: str):
    return get_revenue_trend_controller(email)


# ---------------- GET STARTUPS ----------------
@router.get("/PerformanceSummary/{email}")
def get_PerformanceSummary(email: str):
    return get_PerformanceSummary_controller(email)


# ---------------- GET CERT DISTRIBUTION ----------------
@router.get("/StageDistribution/{email}")
def get_StageDistribution(email: str):
    return get_StageDistribution_controller(email)
