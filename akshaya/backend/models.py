import json
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr


# ===================== CERTIFICATION MODEL =====================
class Certification(BaseModel):
    name: str
    proof: Optional[str] = None   # stored file path

    class Config:
        from_attributes = True


# ===================== EXPERT MODEL =====================
class Expert(BaseModel):
    # Personal
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    dob: Optional[str] = None
    gender: Optional[str] = None

    # Professional
    domain: Optional[str] = None
    subDomain: Optional[List[str]] = []
    experience: Optional[str] = None
    session: Optional[str] = None
    rate: Optional[str] = None
    about: Optional[str] = None
    mode: Optional[str] = None
    address: Optional[str] = None

    # Location
    country: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    city: Optional[str] = None
    area: Optional[str] = None
    pinCode: Optional[str] = None

    # Languages
    languages: Optional[List[str]] = []

    # Digital
    websiteUrl: Optional[str] = None
    linkedinUrl: Optional[str] = None
    othersUrl: Optional[str] = None
    otherUrl: Optional[str] = None

    # Bank
    bankName: Optional[str] = None
    accountHolderName: Optional[str] = None
    accountNumber: Optional[str] = None
    ifscCode: Optional[str] = None
    accountType: Optional[str] = None
    upiId: Optional[str] = None

    # Files (paths only)
    profileImage: Optional[str] = None
    certifications: Optional[List[Certification]] = []

    class Config:
        from_attributes = True

# ===================== HELPERS (IMPORTANT) =====================
def parse_expert_data(expertData: str) -> Dict[str, Any]:
    """
    Used for multipart/form-data requests.
    Converts JSON string -> dict safely.
    """
    try:
        return json.loads(expertData)
    except json.JSONDecodeError:
        raise ValueError("Invalid expertData JSON")
