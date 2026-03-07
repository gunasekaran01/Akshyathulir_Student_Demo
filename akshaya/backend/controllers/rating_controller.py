from database import expert_ratings
from datetime import datetime


def add_multiple_ratings_controller(data):

    expert_ratings.insert_many(data)

    return {
        "status": "success",
        "inserted": len(data)
    }


def get_ratings_by_expert(expertId):

    ratings = list(expert_ratings.find({"expertId": expertId}))

    for r in ratings:
        r["_id"] = str(r["_id"])

    return ratings