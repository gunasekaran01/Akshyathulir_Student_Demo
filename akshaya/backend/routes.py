from fastapi import APIRouter, UploadFile, File, Form, Request
from typing import List, Optional
import shutil
import os
from bson import ObjectId

from database import experts, PROFILE_DIR, CERT_DIR, generate_expert_id
from models import parse_expert_data

router = APIRouter()

# ======================= CREATE ===========================
@router.post("/expert")
async def register_expert(
    expertData: str = Form(...),
    image: UploadFile = File(...),                      # profile image REQUIRED
    certProofs: Optional[List[UploadFile]] = File(None) # certificates OPTIONAL
):
    expert_dict = parse_expert_data(expertData)

    # generate expert ID
    expert_dict["expertId"] = generate_expert_id()

    # ---------- profile image ----------
    img_ext = image.filename.split(".")[-1]
    profile_path = f"{PROFILE_DIR}/{expert_dict['expertId']}_profile.{img_ext}"

    with open(profile_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # ---------- certificates ----------
    saved_certs = []

    if certProofs:
        for idx, cert in enumerate(certProofs):
            cert_ext = cert.filename.split(".")[-1]
            cert_path = f"{CERT_DIR}/{expert_dict['expertId']}_cert_{idx}.{cert_ext}"

            with open(cert_path, "wb") as buffer:
                shutil.copyfileobj(cert.file, buffer)

            saved_certs.append({
                "name": expert_dict.get("certifications", [])[idx].get("name", ""),
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
@router.get("/expert/by-id/{expert_id}")
def get_expert_by_expert_id(expert_id: str):
    expert = experts.find_one({"expertId": expert_id})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert


@router.get("/expert/{mongo_id}")
def get_expert_by_mongo_id(mongo_id: str):
    expert = experts.find_one({"_id": ObjectId(mongo_id)})

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert


# ======================= UPDATE ===========================
@router.put("/expert/by-id/{expert_id}")
async def update_expert_by_expert_id(
    expert_id: str,
    request: Request,
    expertData: str = Form(...)
):
    form = await request.form()
    expert_dict = parse_expert_data(expertData)

    existing_expert = experts.find_one({"expertId": expert_id})
    if not existing_expert:
        return {"error": "Expert not found"}

    update_data = expert_dict.copy()
    update_data.pop("_id", None)
    update_data.pop("expertId", None)

    # ======================================================
    # PROFILE IMAGE
    # ======================================================
    image = form.get("image")
    frontend_profile = expert_dict.get("profileImage", "KEEP")

    if image and hasattr(image, "filename"):
        old_img = existing_expert.get("profileImage")
        if old_img and os.path.exists(old_img):
            os.remove(old_img)

        ext = image.filename.split(".")[-1]
        profile_path = f"{PROFILE_DIR}/{expert_id}_profile.{ext}"

        with open(profile_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        update_data["profileImage"] = profile_path

    elif frontend_profile is None:
        old_img = existing_expert.get("profileImage")
        if old_img and os.path.exists(old_img):
            os.remove(old_img)

        update_data["profileImage"] = None

    else:
        update_data.pop("profileImage", None)

    # ======================================================
    # CERTIFICATES (DELETE / KEEP / REPLACE) — FINAL FIX
    # ======================================================
    old_certs = existing_expert.get("certifications", [])
    new_certs_meta = expert_dict.get("certifications", [])
    cert_files = form.getlist("certProofs")

    final_certs = []

    # ---- keep / replace ----
    for idx, meta in enumerate(new_certs_meta):
        cert_obj = {"name": meta["name"]}

        # replace file
        if idx < len(cert_files):
            if idx < len(old_certs):
                old_path = old_certs[idx].get("proof")
                if old_path and os.path.exists(old_path):
                    os.remove(old_path)

            cert = cert_files[idx]
            ext = cert.filename.split(".")[-1]
            cert_path = f"{CERT_DIR}/{expert_id}_cert_{idx}.{ext}"

            with open(cert_path, "wb") as buffer:
                shutil.copyfileobj(cert.file, buffer)

            cert_obj["proof"] = cert_path

        # keep old file
        elif idx < len(old_certs):
            cert_obj["proof"] = old_certs[idx].get("proof")

        final_certs.append(cert_obj)

    # ---- delete removed cert files ----
    if len(old_certs) > len(new_certs_meta):
        for idx in range(len(new_certs_meta), len(old_certs)):
            old_path = old_certs[idx].get("proof")
            if old_path and os.path.exists(old_path):
                os.remove(old_path)

    update_data["certifications"] = final_certs

    # ======================================================
    # UPDATE DB
    # ======================================================
    result = experts.update_one(
        {"expertId": expert_id},
        {"$set": update_data}
    )

    return {
        "matched": result.matched_count,
        "modified": result.modified_count
    }
# ======================= DELETE ===========================
@router.delete("/expert/by-id/{expert_id}")
def delete_expert_by_expert_id(expert_id: str):
    expert = experts.find_one({"expertId": expert_id})

    if not expert:
        return {"error": "Expert not found"}

    # delete profile image
    if expert.get("profileImage") and os.path.exists(expert["profileImage"]):
        os.remove(expert["profileImage"])

    # delete certificates
    for cert in expert.get("certifications", []):
        if cert.get("proof") and os.path.exists(cert["proof"]):
            os.remove(cert["proof"])

    experts.delete_one({"expertId": expert_id})

    return {"status": "deleted"}