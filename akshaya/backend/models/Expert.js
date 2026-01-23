import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
  name: String,
  proof: String
});

const ExpertSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: Date,
  gender: String,

  domain: { type: String, required: true },
  subDomain: [String],
  experience: String,
  session: Number,
  rate: Number,
  mode: String,
  about: String,
  languages: [String],

  address: {
    country: String,
    state: String,
    district: String,
    city: String,
    area: String,
    pinCode: String,
  },

  profileImage: String,
  certifications: [CertificationSchema],

  bankDetails: {
    bankName: String,
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    accountType: String,
    upiId: String,
  },

  digital: {
    websiteUrl: String,
    linkedinUrl: String,
    othersUrl: String,
    otherUrl: String,
  },

}, { timestamps: true });

  


export default mongoose.model("Expert", ExpertSchema);
