from expert_database import db
from bson import ObjectId
from pymongo import ReturnDocument
from datetime import datetime

users_collection = db["users"]

# ===================== GET USER BY EMAIL =====================
def get_user_by_email_controller(email: str):
    try:
        user = users_collection.find_one({"email": email})
        if not user:
            return {"success": False, "message": "User not found"}
        user["_id"] = str(user.get("_id"))
        return {"success": True, "data": user}
    except Exception as e:
        print(f"Error fetching user by email: {str(e)}")
        return {"success": False, "message": str(e)}

# ===================== CREATE USER =====================
def create_user_controller(user_data: dict):
    try:
        # Check if user already exists
        existing_user = users_collection.find_one({"email": user_data.get("email")})

        if existing_user:
            return {
                "success": False,
                "message": "User already exists"
            }

        # Build user object
        user = {
            "name": user_data.get("name"),
            "email": user_data.get("email"),
            "phone": user_data.get("phone"),
            "createdAt": datetime.utcnow()
        }

        result = users_collection.insert_one(user)

        user["_id"] = str(result.inserted_id)

        return {
            "success": True,
            "message": "User created successfully",
            "data": user
        }

    except Exception as e:
        print(f"Error creating user: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }