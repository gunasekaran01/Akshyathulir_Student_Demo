from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
import json, os, shutil
from pymongo import MongoClient, ReturnDocument
from bson import ObjectId
from datetime import datetime

# ---------------- APP ----------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MONGODB ----------------
client = MongoClient("mongodb://localhost:27017")
db = client["expertDB"]
experts = db["experts"]
counters = db["counters"]
print("Connected to MongoDB")

# ---------------- FOLDERS ----------------
PROFILE_DIR = "uploads/profiles"
CERT_DIR = "uploads/certificates"
os.makedirs(PROFILE_DIR, exist_ok=True)
os.makedirs(CERT_DIR, exist_ok=True)

# ---------------- STATIC FILES ----------------
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ---------------- UNIQUE EXPERT ID GENERATOR ----------------
def generate_expert_id():
    now = datetime.now()
    yy = now.strftime("%y")   # year (26)
    mm = now.strftime("%m")   # month (02)

    counter_key = f"expert_{yy}{mm}"

    counter = counters.find_one_and_update(
        {"_id": counter_key},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return f"EXP{yy}{mm}{counter['seq']:06d}"

# ---------------- TEST ----------------
@app.get("/")
def root():
    return {"message": "Backend running successfully"}

# ======================= CREATE ===========================
@app.post("/expert")
async def register_expert(
    expertData: str = Form(...),
    image: UploadFile = File(...),
    certProofs: List[UploadFile] = File(...)
):
    expert_dict = json.loads(expertData)

    # ✅ generate expert ID
    expert_dict["expertId"] = generate_expert_id()

    # ---------- profile image ----------
    profile_path = f"{PROFILE_DIR}/{image.filename}"
    with open(profile_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # ---------- certificates ----------
    saved_certs = []
    for idx, cert in enumerate(certProofs):
        cert_path = f"{CERT_DIR}/{cert.filename}"
        with open(cert_path, "wb") as buffer:
            shutil.copyfileobj(cert.file, buffer)

        saved_certs.append({
            "name": expert_dict["certifications"][idx]["name"],
            "proof": cert_path
        })

    expert_dict["profileImage"] = profile_path
    expert_dict["certifications"] = saved_certs

    experts.insert_one(expert_dict)

    return {
        "status": "success",
        "expertId": expert_dict["expertId"]
    }

# ======================== READ ============================
@app.get("/expert/by-id/{expert_id}")
def get_expert_by_expert_id(expert_id: str):
    expert = experts.find_one({"expertId": expert_id})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert


# (optional) fetch by Mongo _id
@app.get("/expert/{mongo_id}")
def get_expert_by_mongo_id(mongo_id: str):
    expert = experts.find_one({"_id": ObjectId(mongo_id)})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert

# ======================= UPDATE ===========================
@app.put("/expert/by-id/{expert_id}")
async def update_expert_by_expert_id(
    expert_id: str,
    expertData: str = Form(...),
    image: UploadFile | None = File(None),
    certProofs: List[UploadFile] = File([])
):
    expert_dict = json.loads(expertData)
    update_data = expert_dict.copy()

    # ❗ never allow expertId to change
    update_data.pop("expertId", None)

    # ---------- profile image ----------
    if image:
        profile_path = f"{PROFILE_DIR}/{image.filename}"
        with open(profile_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        update_data["profileImage"] = profile_path

    # ---------- certifications ----------
    if certProofs:
        saved_certs = []
        for idx, cert in enumerate(certProofs):
            cert_path = f"{CERT_DIR}/{cert.filename}"
            with open(cert_path, "wb") as buffer:
                shutil.copyfileobj(cert.file, buffer)

            saved_certs.append({
                "name": expert_dict["certifications"][idx]["name"],
                "proof": cert_path
            })

        update_data["certifications"] = saved_certs

    result = experts.update_one(
        {"expertId": expert_id},
        {"$set": update_data}
    )

    return {
        "matched": result.matched_count,
        "modified": result.modified_count
    }

# ======================= DELETE ===========================
@app.delete("/expert/by-id/{expert_id}")
def delete_expert_by_expert_id(expert_id: str):
    expert = experts.find_one({"expertId": expert_id})

    if not expert:
        return {"error": "Expert not found"}

    # delete profile image
    if os.path.exists(expert.get("profileImage", "")):
        os.remove(expert["profileImage"])

    # delete certificates
    for cert in expert.get("certifications", []):
        if os.path.exists(cert["proof"]):
            os.remove(cert["proof"])

    experts.delete_one({"expertId": expert_id})

    return {"status": "deleted"}
