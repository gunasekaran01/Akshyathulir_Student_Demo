from pymongo import MongoClient, ReturnDocument
from datetime import datetime
import os

# ---------------- MONGODB ----------------
client = MongoClient("mongodb://localhost:27017")
db = client["expertDB"]
experts = db["experts"]
counters = db["counters"]
dashboard_collection = db["dashboard_data"]
mentees_collection = db["mentees_data"]
revenue_collection = db["revenue_data"]
availability_dashboard = db["availability_dashboard"]
resource_collection = db["resources_data"]
expert_ratings = db["expert_ratings"]
ads_collection = db["sponsored_ads"]
ads_controller_collection=db["ads_controller"]
bookings_collection = db["bookings"]
print("Connected to MongoDB")
# ---------------- FOLDERS ----------------
PROFILE_DIR = "uploads/profiles"
CERT_DIR = "uploads/certificates"

os.makedirs(PROFILE_DIR, exist_ok=True)
os.makedirs(CERT_DIR, exist_ok=True)
#---------------- COUNTERS ----------------#
def generate_expert_id():
    now = datetime.now()
    yy = now.strftime("%y")
    mm = now.strftime("%m")

    counter_key = f"expert_{yy}{mm}"

    counter = counters.find_one_and_update(
        {"_id": counter_key},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return f"EXP{yy}{mm}{counter['seq']:06d}"
