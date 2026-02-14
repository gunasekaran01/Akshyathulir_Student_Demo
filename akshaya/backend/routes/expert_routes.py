from fastapi import APIRouter, UploadFile, File, Form, Request
from typing import List, Optional

from controllers.expert_controller import (
    create_expert_controller,
    update_expert_controller,
    delete_expert_controller,
    get_expert_by_email_controller
)

router = APIRouter()


@router.post("/expert")
async def register_expert(
    expertData: str = Form(...),
    image: UploadFile = File(...),
    certProofs: Optional[List[UploadFile]] = File(None)
):
    return await create_expert_controller(expertData, image, certProofs)

@router.put("/expert/by-email/{email}")
async def update_expert_by_email(
    email: str,
    request: Request,
    expertData: str = Form(...)
):
    return await update_expert_controller(email, request, expertData)

@router.get("/expert/by-email/{email}")
def get_expert_by_email(email: str):
    return get_expert_by_email_controller(email)

@router.delete("/expert/by-email/{email}")
def delete_expert_by_email(email: str):
    return delete_expert_controller(email)