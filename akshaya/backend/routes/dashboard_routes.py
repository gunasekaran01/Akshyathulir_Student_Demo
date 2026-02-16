from fastapi import APIRouter
from controllers.dashboard_controller import (
    save_dashboard_data_controller,
    get_dashboard_kpi_dashboard_controller,
    get_growth_trend_controller,
    get_revenue_trend_controller,
    get_PerformanceSummary_controller,
    get_StageDistribution_controller
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


# ---------------- INSERT / UPDATE DASHBOARD ----------------
@router.post("/save")
def save_dashboard(data: dict):
    return save_dashboard_data_controller(data)


# ---------------- GET SUMMARY ----------------
@router.get("/kpi_dashboard")
def get_kpi_dashboard():
    return get_dashboard_kpi_dashboard_controller()


# ---------------- GET GROWTH ----------------
@router.get("/growth")
def get_growth():
    return get_growth_trend_controller()


# ---------------- GET REVENUE ----------------
@router.get("/revenue")
def get_revenue():
    return get_revenue_trend_controller()


# ---------------- GET STARTUPS ----------------
@router.get("/PerformanceSummary")
def get_PerformanceSummary():
    return get_PerformanceSummary_controller()


# ---------------- GET CERT DISTRIBUTION ----------------
@router.get("/StageDistribution")
def get_StageDistribution():
    return get_StageDistribution_controller()