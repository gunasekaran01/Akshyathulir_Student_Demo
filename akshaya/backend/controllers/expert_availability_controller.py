from expert_database import availability_dashboard

# ================= SAVE AVAILABILITY =================
def save_availability_data_controller(email: str, data: dict):
    data["email"] = email
    availability_dashboard.update_one(
        {"email": email},
        {"$set": data},
        upsert=True
    )
    return {
        "status": "success",
        "message": "Availability saved successfully",
        "email": email
    }

# ================= KPI =================
def get_availability_kpi_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return {}
    return data.get("kpi", {})

# ================= WEEKLY AVAILABILITY =================
def get_weeklyAvailability_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("weeklyAvailability", [])

# ================= SESSION DATES =================
def get_sessionDates_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("sessionDates", [])

# ================= BLOCKED DATES =================
def get_blockedDates_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("blockedDates", [])

# ================= SESSION LOAD =================
def get_sessionLoad_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("sessionLoad", [])

# ================= AVAILABILITY STATUS =================
def get_availabilityStatus_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("availabilityStatus", [])

# ================= MONTHLY SESSIONS =================
def get_monthlySessions_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("monthlySessions", [])

# ================= UPCOMING SLOTS =================
def get_upcomingSlots_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("upcomingSlots", [])

# ================= SESSIONS COMPLETED =================
def get_sessionsCompleted_controller(email: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return []
    return data.get("sessionsCompleted", [])

# ================= ADD SESSION DATE =================
def add_session_date_controller(email: str, date: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return {"error": "Expert not found"}
    session_dates = data.get("sessionDates", [])
    blocked_dates = data.get("blockedDates", [])
    # If date exists in blocked → remove it
    if date in blocked_dates:
        blocked_dates.remove(date)
    if date not in session_dates:
        session_dates.append(date)
    availability_dashboard.update_one(
        {"email": email},
        {"$set": {
            "sessionDates": session_dates,
            "blockedDates": blocked_dates
        }}
    )
    return {"message": "Session date added"}

def block_date_controller(email: str, date: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return {"error": "Expert not found"}
    session_dates = data.get("sessionDates", [])
    blocked_dates = data.get("blockedDates", [])
    # remove from availability
    if date in session_dates:
        session_dates.remove(date)
    if date not in blocked_dates:
        blocked_dates.append(date)
    availability_dashboard.update_one(
        {"email": email},
        {"$set": {
            "sessionDates": session_dates,
            "blockedDates": blocked_dates
        }}
    )
    return {"message": "Date blocked"}

def delete_date_controller(email: str, date: str):
    data = availability_dashboard.find_one({"email": email})
    if not data:
        return {"error": "Expert not found"}
    session_dates = data.get("sessionDates", [])
    blocked_dates = data.get("blockedDates", [])
    if date in session_dates:
        session_dates.remove(date)
    if date in blocked_dates:
        blocked_dates.remove(date)
    availability_dashboard.update_one(
        {"email": email},
        {"$set": {
            "sessionDates": session_dates,
            "blockedDates": blocked_dates
        }}
    )
    return {"message": "Date removed"}