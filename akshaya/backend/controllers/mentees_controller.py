from database import mentees_collection


# ---------------- SAVE MENTEES DATA ----------------
def save_mentees_data_controller(email: str, data: dict):

    data["email"] = email

    mentees_collection.update_one(
        {"email": email},
        {"$set": data},
        upsert=True
    )

    return {
        "status": "success",
        "message": "Mentees data saved",
        "email": email
    }


# ---------------- GET KPI ----------------
def get_kpi_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return {}

    return data.get("kpi", {})


# ---------------- GET PROGRESS TREND ----------------
def get_progress_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("progressTrend", [])


# ---------------- GET HEALTH ----------------
def get_health_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("healthDistribution", [])


# ---------------- GET STARTUPS ----------------
def get_startups_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("startups", [])


# ---------------- GET ACTIONS ----------------
def get_actions_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("actions", [])
#---------------session growth----------------
def get_session_growth_controller(email: str):

    data = mentees_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("sessionGrowth", [])