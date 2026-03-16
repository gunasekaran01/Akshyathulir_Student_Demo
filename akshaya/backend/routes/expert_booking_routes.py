from fastapi import APIRouter
from controllers.expert_booking_controller import (
    accept_complete_controller,
    create_booking_controller,
    get_expert_bookings_controller,
    get_mentee_bookings_controller,
    reject_complete_controller,
    request_complete_controller,
    update_booking_status_controller,
    get_booking_count_by_status_controller,
    delete_booking_controller,
    reschedule_booking_controller,
    send_meeting_link_controller,
    request_reschedule_controller,
    accept_reschedule_controller,
    reject_reschedule_controller,
)

router = APIRouter(prefix="/bookings", tags=["Bookings"])


# ===================== CREATE BOOKING =====================
@router.post("/create")
def create_booking(booking_data: dict):
    
    return create_booking_controller(booking_data)


# ===================== GET EXPERT BOOKINGS =====================
@router.get("/expert/{expert_email}")
def get_expert_bookings(expert_email: str, status: str = None):
    
    return get_expert_bookings_controller(expert_email, status)


# ===================== GET EXPERT BOOKING COUNTS =====================
@router.get("/expert-counts/{expert_email}")
def get_expert_booking_counts(expert_email: str):
   
    return get_booking_count_by_status_controller(expert_email)


# ===================== GET MENTEE BOOKINGS =====================
@router.get("/mentee/{mentee_email}")
def get_mentee_bookings(mentee_email: str):
    
    return get_mentee_bookings_controller(mentee_email)


# ===================== UPDATE BOOKING STATUS =====================
@router.put("/update/{booking_id}/{status}")
def update_booking_status(booking_id: str, status: str):
   
    return update_booking_status_controller(booking_id, status)


# ===================== DELETE BOOKING =====================
@router.delete("/delete/{booking_id}")
def delete_booking(booking_id: str):
    
    return delete_booking_controller(booking_id)


# ===================== RESCHEDULE BOOKING =====================
@router.put("/update/{booking_id}/reschedule")
def reschedule_booking(booking_id: str, reschedule_data: dict):
    
    return reschedule_booking_controller(booking_id, reschedule_data)


# ===================== SEND MEETING LINK =====================
@router.post("/send-link/{booking_id}")
def send_meeting_link(booking_id: str, link_data: dict):
    
    return send_meeting_link_controller(booking_id, link_data.get("meetingLink"))


# ===================== REQUEST RESCHEDULE (EXPERT) =====================
@router.post("/request-reschedule/{booking_id}")
def request_reschedule(booking_id: str, reschedule_data: dict):
    
    return request_reschedule_controller(
        booking_id, 
        reschedule_data.get("newDate"), 
        reschedule_data.get("newTime")
    )


# ===================== ACCEPT RESCHEDULE (MENTEE) =====================
@router.put("/accept-reschedule/{booking_id}")
def accept_reschedule(booking_id: str):
    
    return accept_reschedule_controller(booking_id)


# ===================== REJECT RESCHEDULE (MENTEE) =====================
@router.put("/reject-reschedule/{booking_id}")
def reject_reschedule(booking_id: str):
    
    return reject_reschedule_controller(booking_id)

#===================== COMPLETE SESSION =======================    
@router.post("/request-complete/{booking_id}")
def request_complete(booking_id: str):
    return request_complete_controller(booking_id)

@router.put("/accept-complete/{booking_id}")
def accept_complete(booking_id: str):
    return accept_complete_controller(booking_id)

@router.put("/reject-complete/{booking_id}")
def reject_complete(booking_id: str):
    return reject_complete_controller(booking_id)