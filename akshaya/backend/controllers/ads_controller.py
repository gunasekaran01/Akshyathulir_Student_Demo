from database import ads_collection as sponsored_ads
from bson import ObjectId
from datetime import datetime, timezone


# ================= GET ADS =================
def get_ads_controller():

    ads = list(sponsored_ads.find({"status": "active"}))

    for ad in ads:
        ad["_id"] = str(ad["_id"])

    return ads


# ================= CREATE AD =================
def create_ad_controller(data: dict):

    try:

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

    except Exception as e:
        return {"error": str(e)}


# ================= DELETE AD =================
def delete_ad_controller(ad_id: str):

    try:

        result = sponsored_ads.delete_one({"_id": ObjectId(ad_id)})

        if result.deleted_count == 0:
            return {"error": "Ad not found"}

        return {
            "status": "success",
            "message": "Ad deleted successfully"
        }

    except Exception as e:
        return {"error": str(e)}