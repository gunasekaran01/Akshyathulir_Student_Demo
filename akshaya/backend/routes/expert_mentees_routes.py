from fastapi import APIRouter
from controllers.expert_mentees_controller import (
    save_mentees_data_controller,
    get_kpi_controller,
    get_progress_controller,
    get_health_controller,
    get_startups_controller,
    get_session_growth_controller,
    get_actions_controller
)

router = APIRouter(prefix="/mentees", tags=["Mentees"])


@router.post("/save/{email}")
def save_data(email: str, data: dict):
    return save_mentees_data_controller(email, data)


@router.get("/kpi/{email}")
def get_kpi(email: str):
    return get_kpi_controller(email)


@router.get("/progress/{email}")
def get_progress(email: str):
    return get_progress_controller(email)


@router.get("/health/{email}")
def get_health(email: str):
    return get_health_controller(email)


@router.get("/startups/{email}")
def get_startups(email: str):
    return get_startups_controller(email)

@router.get("/sessions/{email}")
def get_sessions(email: str):
    return get_session_growth_controller(email)


@router.get("/actions/{email}")
def get_actions(email: str):
    return get_actions_controller(email)