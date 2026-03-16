import os
import shutil
from expert_database import resource_collection

UPLOAD_FOLDER = "uploads/resources"


# ================= UPLOAD FILE =================
async def upload_resource_controller(email: str, file):

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "fileName": file.filename,
        "fileURL": f"http://localhost:8000/uploads/resources/{file.filename}"
    }


# ================= SAVE RESOURCE DATA =================
def save_resource_data_controller(email: str, data: dict):

    data["email"] = email

    resource_collection.update_one(
        {"email": email},
        {"$set": data},
        upsert=True
    )

    return {
        "status": "success",
        "message": "Resource data saved successfully",
        "email": email
    }


# ================= GET KPI =================
def get_resource_kpi_controller(email: str):

    data = resource_collection.find_one({"email": email})

    if not data:
        return {}

    resources = data.get("resources", [])

    return {
        "totalResources": len(resources),
        "documents": len([r for r in resources if r["type"] == "Document"]),
        "videos": len([r for r in resources if r["type"] == "Video"]),
        "ppt": len([r for r in resources if r["type"] == "PPT"]),
        "freeResources": len([r for r in resources if r["pricing"] == "FREE"]),
        "paidResources": len([r for r in resources if r["pricing"] == "PAID"]),
    }


# ================= GET ALL RESOURCES =================
def get_all_resources_controller(email: str):

    data = resource_collection.find_one({"email": email})

    if not data:
        return []

    return data.get("resources", [])


# ================= DELETE RESOURCE =================
def delete_resource_controller(email: str, resource_id: int):

    data = resource_collection.find_one({"email": email})

    if not data:
        return {"status": "error", "message": "User not found"}

    resources = data.get("resources", [])

    resource_to_delete = None

    for r in resources:
        if r["id"] == resource_id:
            resource_to_delete = r
            break

    if not resource_to_delete:
        return {"status": "error", "message": "Resource not found"}

    # 🔥 DELETE PHYSICAL FILE
    if "fileName" in resource_to_delete:
        file_path = os.path.join(UPLOAD_FOLDER, resource_to_delete["fileName"])
        if os.path.exists(file_path):
            os.remove(file_path)

    # Remove from Mongo
    resource_collection.update_one(
        {"email": email},
        {"$pull": {"resources": {"id": resource_id}}}
    )

    return {
        "status": "success",
        "message": "Resource deleted successfully"
    }