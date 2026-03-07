from fastapi import APIRouter
from controllers.ads_controller import (
    get_ads_controller,
    create_ad_controller,
    delete_ad_controller
)

router = APIRouter(tags=["Sponsored Ads"])


# GET ALL ADS
@router.get("/ads")
def get_ads():
    return get_ads_controller()


# CREATE AD
@router.post("/ads")
def create_ad(data: dict):
    return create_ad_controller(data)


# DELETE AD
@router.delete("/ads/{ad_id}")
def delete_ad(ad_id: str):
    return delete_ad_controller(ad_id)