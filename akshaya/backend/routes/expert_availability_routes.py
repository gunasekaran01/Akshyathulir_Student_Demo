from fastapi import APIRouter
from pydantic import BaseModel
from controllers.expert_availability_controller import (
    block_date_controller,
    add_session_date_controller,
    delete_date_controller,
    save_availability_data_controller,
    get_availability_kpi_controller,
    get_weeklyAvailability_controller,
    get_sessionDates_controller,
    get_blockedDates_controller,
    get_sessionLoad_controller,
    get_sessionsCompleted_controller,
    get_availabilityStatus_controller,
    get_monthlySessions_controller,
    get_upcomingSlots_controller
)

router = APIRouter(prefix="/availability",tags=["Availability"])

# ---------------- INSERT / UPDATE AVAILABILITY ----------------
@router.post("/save/{email}")
def save_availability_data(email: str, data: dict):
    return save_availability_data_controller(email, data)

# ================= KPI =================
@router.get("/kpi/{email}")
def get_kpi(email: str):
    return get_availability_kpi_controller(email)

# ================= WEEKLY AVAILABILITY =================
@router.get("/weeklyAvailability/{email}")
def get_weeklyAvailability(email: str):
    return get_weeklyAvailability_controller(email)

# ================= SESSION DATES =================
@router.get("/sessionDates/{email}")
def get_sessionDates(email: str):
    return get_sessionDates_controller(email)

# ================= BLOCKED DATES =================
@router.get("/blockedDates/{email}")
def get_blockedDates(email: str):
    return get_blockedDates_controller(email)

# ================= SESSION LOAD =================
@router.get("/sessionLoad/{email}")
def get_sessionLoad(email: str):
    return get_sessionLoad_controller(email)

# ================= AVAILABILITY STATUS =================
@router.get("/availabilityStatus/{email}")
def get_availabilityStatus(email: str):
    return get_availabilityStatus_controller(email)

# ================= MONTHLY SESSIONS =================
@router.get("/monthlySessions/{email}")
def get_monthlySessions(email: str):
    return get_monthlySessions_controller(email)

# ================= UPCOMING SLOTS =================
@router.get("/upcomingSlots/{email}")
def get_upcomingSlots(email: str):
    return get_upcomingSlots_controller(email)

# ================= SESSIONS COMPLETED =================
@router.get("/sessionsCompleted/{email}")
def get_sessionsCompleted(email: str):
    return get_sessionsCompleted_controller(email)
class SessionRequest(BaseModel):
    email: str
    date: str

@router.put("/addSession")
def add_session(data: dict):
    return add_session_date_controller(data["email"], data["date"])

@router.put("/blockDate")
def block_date(data: dict):
    return block_date_controller(data["email"], data["date"])

@router.delete("/deleteDate")
def delete_date(data: dict):
    return delete_date_controller(data["email"], data["date"])