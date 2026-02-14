from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
# ===================== CERTIFICATION MODEL =====================
class Certification(BaseModel):
    name: str
    proof: Optional[str] = None   # stored file path
    class Config:
        from_attributes = True
# ===================== EXPERT MODEL =====================
class Expert(BaseModel):
    # ================= PERSONAL =================
    firstName: str
    lastName: str
    email: EmailStr
    phone: str                     
    dob: Optional[str] = None     
    gender: Optional[str] = None

    # ================= PROFESSIONAL =================
    domain: Optional[str] = None
    subDomain: List[str] = Field(default_factory=list)
    experience: Optional[int] = None    
    session: Optional[int] = None        
    rate: Optional[float] = None         
    about: Optional[str] = None
    mode: Optional[str] = None
    address: Optional[str] = None

    # ================= LOCATION =================
    country: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    city: Optional[str] = None
    area: Optional[str] = None
    pinCode: Optional[str] = None        
    # ================= LANGUAGES =================
    languages: List[str] = Field(default_factory=list)

    # ================= DIGITAL =================
    websiteUrl: Optional[str] = None     
    linkedinUrl: Optional[str] = None
    othersUrl: Optional[str] = None
    otherUrl: Optional[str] = None

    # ================= BANK =================
    bankName: Optional[str] = None
    accountHolderName: Optional[str] = None
    accountNumber: Optional[str] = None  
    ifscCode: Optional[str] = None
    accountType: Optional[str] = None
    upiId: Optional[str] = None

    # ================= FILE PATHS =================
    profileImage: Optional[str] = None
    certifications: List[Certification] = Field(default_factory=list)
    class Config:
        from_attributes = True