from fastapi import APIRouter
from controllers.expert_user_controller import create_user_controller, get_user_by_email_controller

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/getByEmail/{email}")
def get_user_by_email(email: str):
    return get_user_by_email_controller(email)

@router.post("/users/create")
async def create_user(user_data: dict):
    return create_user_controller(user_data)
