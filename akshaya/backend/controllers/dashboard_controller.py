from database import dashboard_collection


# ================= INSERT OR UPDATE DASHBOARD =================
def save_dashboard_data_controller(data: dict):

    dashboard_collection.update_one(
        {},                 # single dashboard document
        {"$set": data},
        upsert=True
    )

    return {
        "status": "success",
        "message": "Dashboard data saved successfully"
    }


# ================= FETCH SUMMARY =================
def get_dashboard_kpi_dashboard_controller():

    data = dashboard_collection.find_one()

    if not data:
        return {}

    return data.get("kpi_dashboard", {})


# ================= FETCH GROWTH =================
def get_growth_trend_controller():

    data = dashboard_collection.find_one()

    if not data:
        return []

    return data.get("growth", [])


# ================= FETCH REVENUE =================
def get_revenue_trend_controller():

    data = dashboard_collection.find_one()

    if not data:
        return []

    return data.get("revenue", [])


# ================= FETCH PerformanceSummary =================
def get_PerformanceSummary_controller():

    data = dashboard_collection.find_one()

    if not data:
        return []

    return data.get("PerformanceSummary", [])


# ================= FETCH CERT DISTRIBUTION =================
def get_StageDistribution_controller():

    data = dashboard_collection.find_one()

    if not data:
        return []

    return data.get("StageDistribution", [])