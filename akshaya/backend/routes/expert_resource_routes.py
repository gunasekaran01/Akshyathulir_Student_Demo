from fastapi import APIRouter, UploadFile, File
from controllers.expert_resource_controller import (
    save_resource_data_controller,
    get_resource_kpi_controller,
    get_all_resources_controller,
    delete_resource_controller,
    upload_resource_controller  
)

router = APIRouter(prefix="/resource", tags=["Resource"])


# ---------------- UPLOAD FILE ----------------
@router.post("/upload/{email}")
async def upload_resource(email: str, file: UploadFile = File(...)):
    return await upload_resource_controller(email, file)


# ---------------- INSERT / UPDATE RESOURCE DATA ----------------
@router.post("/save/{email}")
def save_resource(email: str, data: dict):
    return save_resource_data_controller(email, data)


# ---------------- GET RESOURCE KPI ----------------
@router.get("/kpi/{email}")
def get_resource_kpi(email: str):
    return get_resource_kpi_controller(email)


# ---------------- GET ALL RESOURCES ----------------
@router.get("/all/{email}")
def get_all_resources(email: str):
    return get_all_resources_controller(email)


# ---------------- DELETE RESOURCE ----------------
@router.delete("/delete/{email}")
def delete_resource(email: str, resource_id: int):
    return delete_resource_controller(email, resource_id)