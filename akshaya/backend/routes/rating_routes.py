from fastapi import APIRouter
from typing import List
from controllers.rating_controller import (
    add_multiple_ratings_controller,
    get_ratings_by_expert
)

router = APIRouter(tags=["Ratings"])


@router.post("/ratings")
def add_ratings(data: List[dict]):
    return add_multiple_ratings_controller(data)


@router.get("/rating/{expertId}")
def get_rating(expertId: str):
    return get_ratings_by_expert(expertId)