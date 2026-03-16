import os
import shutil
import json
from typing import List, Optional
from fastapi import UploadFile, Request
from expert_database import experts, PROFILE_DIR, CERT_DIR, generate_expert_id
from expert_models import Expert


# ======================= CREATE ===========================
async def create_expert_controller(
    expertData: str,
    image: UploadFile,
    certProofs: Optional[List[UploadFile]]
):
    try:
        expert = Expert(**json.loads(expertData))
        expert_dict = expert.model_dump()

        # 🔐 Prevent duplicate email
        if experts.find_one({"email": expert_dict["email"]}):
            return {"error": "Expert with this email already exists"}

        # -------- PROFILE IMAGE --------
        img_ext = image.filename.split(".")[-1]
        profile_path = f"{PROFILE_DIR}/{expert_dict['email']}_profile.{img_ext}"

        with open(profile_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # -------- CERTIFICATES --------
        saved_certs = []

        if certProofs:
            for idx, cert in enumerate(certProofs):
                cert_ext = cert.filename.split(".")[-1]
                cert_path = f"{CERT_DIR}/{expert_dict['email']}_cert_{idx}.{cert_ext}"

                with open(cert_path, "wb") as buffer:
                    shutil.copyfileobj(cert.file, buffer)

                saved_certs.append({
                    "name": expert_dict.get("certifications", [])[idx].get("name", ""),
                    "proof": cert_path
                })

        expert_dict["profileImage"] = profile_path
        expert_dict["certifications"] = saved_certs
        expert_dict["expertId"] = generate_expert_id()

        experts.insert_one(expert_dict)

        return {
            "status": "success",
            "message": "Expert created successfully",
            "email": expert_dict["email"]
        }

    except Exception as e:
        return {"error": str(e)}


# ======================== READ ============================
def get_expert_by_email_controller(email: str):
    expert = experts.find_one({"email": email })

    if not expert:
        return {"error": "Expert not found"}

    expert["_id"] = str(expert["_id"])
    return expert


# ======================== UPDATE ==========================
async def update_expert_controller(
    email: str,
    request: Request,
    expertData: str
):
    try:
        form = await request.form()

        existing_expert = experts.find_one({"email": email})
        if not existing_expert:
            return {"error": "Expert not found"}

        expert_dict = Expert(**json.loads(expertData)).model_dump()

        update_data = expert_dict.copy()
        update_data.pop("_id", None)

        # -------- PROFILE IMAGE UPDATE --------
        image = form.get("image")

        if image and hasattr(image, "filename") and image.filename:

            # Remove old image
            old_img = existing_expert.get("profileImage")
            if old_img and os.path.exists(old_img):
                os.remove(old_img)

            ext = image.filename.split(".")[-1]
            profile_path = f"{PROFILE_DIR}/{email}_profile.{ext}"

            with open(profile_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            update_data["profileImage"] = profile_path

        # -------- CERTIFICATES UPDATE --------
        old_certs = existing_expert.get("certifications", [])
        new_certs_meta = expert_dict.get("certifications", [])
        cert_files = form.getlist("certProofs")

        final_certs = []

        for idx, meta in enumerate(new_certs_meta):

            cert_obj = {"name": meta["name"]}

            # New uploaded cert
            if idx < len(cert_files):
                cert = cert_files[idx]
                ext = cert.filename.split(".")[-1]
                cert_path = f"{CERT_DIR}/{email}_cert_{idx}.{ext}"

                with open(cert_path, "wb") as buffer:
                    shutil.copyfileobj(cert.file, buffer)

                cert_obj["proof"] = cert_path

            # Keep old cert
            elif idx < len(old_certs):
                cert_obj["proof"] = old_certs[idx].get("proof")

            final_certs.append(cert_obj)

        update_data["certifications"] = final_certs

        result = experts.update_one(
            {"email": email},
            {"$set": update_data}
        )

        return {
            "status": "updated",
            "matched": result.matched_count,
            "modified": result.modified_count
        }

    except Exception as e:
        return {"error": str(e)}


# ======================== DELETE ==========================
def delete_expert_controller(email: str):
    expert = experts.find_one({"email": email})

    if not expert:
        return {"error": "Expert not found"}

    # -------- DELETE PROFILE IMAGE --------
    if expert.get("profileImage") and os.path.exists(expert["profileImage"]):
        os.remove(expert["profileImage"])

    # -------- DELETE CERTIFICATES --------
    for cert in expert.get("certifications", []):
        if cert.get("proof") and os.path.exists(cert["proof"]):
            os.remove(cert["proof"])

    experts.delete_one({"email": email})

    return {
        "status": "deleted",
        "message": "Expert deleted successfully"
    }
    # ======================== GET ALL ==========================
def get_all_experts_controller():
    expert_list = []

    for expert in experts.find():
        expert["_id"] = str(expert["_id"])
        expert_list.append(expert)

    return expert_list