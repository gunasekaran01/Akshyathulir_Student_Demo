from fastapi import APIRouter
from controllers.expert_revenue_controller import (
    save_revenue_data_controller,
    get_revenue_kpi_controller,
    get_revenue_trend_controller,
    get_revenue_sources_controller,
    get_transactions_controller
)

router = APIRouter(prefix="/revenue", tags=["Revenue"])


@router.post("/save/{email}")
def save_data(email: str, data: dict):
    return save_revenue_data_controller(email, data)


@router.get("/kpi/{email}")
def get_kpi(email: str):
    return get_revenue_kpi_controller(email)


@router.get("/trend/{email}")
def get_trend(email: str):
    return get_revenue_trend_controller(email)


@router.get("/sources/{email}")
def get_sources(email: str):
    return get_revenue_sources_controller(email)


@router.get("/transactions/{email}")
def get_transactions(email: str):
    return get_transactions_controller(email)