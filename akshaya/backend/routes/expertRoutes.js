import express from "express";
import Expert from "../models/Expert.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "certProofs" }
  ]),
  async (req, res) => {
    try {
      const expertData = JSON.parse(req.body.expertData);

      const profileImage = req.files.image?.[0].filename;

      const certifications = expertData.certifications.map(
        (cert, index) => ({
          name: cert.name,
          proof: req.files.certProofs[index]?.filename
        })
      );
const expert = new Expert({
  firstName: expertData.firstName,
  lastName: expertData.lastName,
  email: expertData.email,
  phone: expertData.phone,
  dob: expertData.dob,
  gender: expertData.gender,

  domain: expertData.domain,
  subDomain: expertData.subDomain,
  experience: expertData.experience, // 🔥 FIX
  session: Number(expertData.session),
  rate: Number(expertData.rate),
  mode: expertData.mode,
  about: expertData.about,
  languages: expertData.languages,

  address: {
    country: expertData.country,
    state: expertData.state,
    district: expertData.district,
    city: expertData.city,
    area: expertData.area,
    pinCode: expertData.pinCode,
  },

  bankDetails: {
    bankName: expertData.bankName,
    accountHolderName: expertData.accountHolderName,
    accountNumber: expertData.accountNumber,
    ifscCode: expertData.ifscCode,
    accountType: expertData.accountType,
    upiId: expertData.upiId,
  },

  digital: {
    websiteUrl: expertData.websiteUrl,
    linkedinUrl: expertData.linkedinUrl,
    othersUrl: expertData.othersUrl,
    otherUrl: expertData.otherUrl,
  },

  profileImage,
  certifications,
});


      await expert.save();

      res.status(201).json({
        message: "✅ Expert registered successfully",
        expert
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "❌ Server error" });
    }
  }
);

export default router;
