from database import ads_collection as sponsored_ads
from database import ads_controller_collection
from bson import ObjectId
from datetime import datetime, timezone


# ================= GET ADS =================
def get_ads_controller():

    controller = ads_controller_collection.find_one()

    # if ads OFF return empty
    if not controller or controller.get("ads") != "on":
        return []

    ads = list(sponsored_ads.find({"status": "active"}).sort("priority", 1))

    for ad in ads:
        ad["_id"] = str(ad["_id"])

    return ads


# ================= CREATE AD =================
def create_ad_controller(data: dict):

    ad = {
        "title": data.get("title"),
        "description": data.get("description"),
        "image": data.get("image"),
        "cta": data.get("cta"),
        "link": data.get("link"),
        "status": data.get("status", "active"),
        "priority": data.get("priority", 1),
        "createdAt": datetime.now(timezone.utc).isoformat()
    }

    result = sponsored_ads.insert_one(ad)

    return {
        "status": "success",
        "message": "Ad created successfully",
        "adId": str(result.inserted_id)
    }


# ================= DELETE AD =================
def delete_ad_controller(ad_id: str):

    sponsored_ads.delete_one({"_id": ObjectId(ad_id)})

    return {
        "status": "success",
        "message": "Ad deleted successfully"
    }


# ================= TOGGLE ADS =================
def toggle_ads_controller(status: str):

    ads_controller_collection.update_one(
        {},
        {"$set": {"ads": status}},
        upsert=True
    )

    return {
        "status": "success",
        "ads": status
    }