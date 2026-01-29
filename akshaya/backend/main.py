from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json, os, shutil
from pymongo import MongoClient

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
print("Connected to MongoDB")

# ---------------- FOLDERS ----------------
PROFILE_DIR = "uploads/profiles"
CERT_DIR = "uploads/certificates"
os.makedirs(PROFILE_DIR, exist_ok=True)
os.makedirs(CERT_DIR, exist_ok=True)

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
    result = experts.insert_one(expert_dict)

    return {
        "status": "success",
        "inserted_id": str(result.inserted_id)
    }
