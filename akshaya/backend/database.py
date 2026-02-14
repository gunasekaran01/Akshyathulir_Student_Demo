from pymongo import MongoClient
import os

# ---------------- MONGODB ----------------
client = MongoClient("mongodb://localhost:27017")
db = client["expertDB"]
experts = db["experts"]
print("Connected to MongoDB")

# ---------------- FOLDERS ----------------
PROFILE_DIR = "uploads/profiles"
CERT_DIR = "uploads/certificates"

os.makedirs(PROFILE_DIR, exist_ok=True)
os.makedirs(CERT_DIR, exist_ok=True)