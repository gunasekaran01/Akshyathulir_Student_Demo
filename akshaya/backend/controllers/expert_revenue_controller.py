from expert_database import revenue_collection


# ---------------- SAVE REVENUE DATA ----------------
def save_revenue_data_controller(email: str, data: dict):

    data["email"] = email

    revenue_collection.update_one(
        {"email": email},
        {"$set": data},
        upsert=True
    )

    return {
        "status": "success",
        "message": "Revenue data saved",
        "email": email
    }


# ---------------- GET KPI ----------------
def get_revenue_kpi_controller(email: str):

    data = revenue_collection.find_one({"email": email})

    if not data:
        return {}

    return data.get("kpi", {})


# ---------------- GET TREND ----------------
def get_revenue_trend_controller(email: str):

    data = revenue_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("revenueTrend", [])


# ---------------- GET SOURCES ----------------
def get_revenue_sources_controller(email: str):

    data = revenue_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("revenueSources", [])


# ---------------- GET TRANSACTIONS ----------------
def get_transactions_controller(email: str):

    data = revenue_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("transactions", [])