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
    yy = now.strftime("%y")   # Year (26)
    mm = now.strftime("%m")   # Month (02)

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
    return {"message": "Backend running"}

# ---------------- REGISTER ----------------
@app.post("/expert")
async def register_expert(
    expertData: str = Form(...),
    image: UploadFile = File(...),
    certProofs: List[UploadFile] = File(...)
):
    expert_dict = json.loads(expertData)

    # ✅ ADD: GENERATE UNIQUE EXPERT ID
    expert_dict["expertId"] = generate_expert_id()

    # ---- save profile image ----
    profile_path = f"{PROFILE_DIR}/{image.filename}"
    with open(profile_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # ---- save certifications ----
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

    # ---- INSERT INTO MONGODB ----
    experts.insert_one(expert_dict)

    return {
        "status": "success",
        "expertId": expert_dict["expertId"]
    }

# ---------------- FETCH BY EXPERT ID ----------------
@app.get("/expert/by-id/{expert_id}")
def get_expert_by_expert_id(expert_id: str):
    expert = experts.find_one({"expertId": expert_id})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert

# ---------------- OPTIONAL: FETCH BY MONGO ID ----------------
@app.get("/expert/{expert_id}")
def get_expert(expert_id: str):
    expert = experts.find_one({"_id": ObjectId(expert_id)})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert

# ---------------- DELETE EXPERT ----------------
@app.delete("/expert/{expert_id}")
def delete_expert(expert_id: str):
    expert = experts.find_one({"_id": ObjectId(expert_id)})

    if not expert:
        return {"error": "Expert not found"}

    if os.path.exists(expert.get("profileImage", "")):
        os.remove(expert["profileImage"])

    for cert in expert.get("certifications", []):
        if os.path.exists(cert["proof"]):
            os.remove(cert["proof"])

    experts.delete_one({"_id": ObjectId(expert_id)})

    return {"status": "deleted"}
