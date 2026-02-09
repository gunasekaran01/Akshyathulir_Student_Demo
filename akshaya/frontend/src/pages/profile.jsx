import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Typography,
    Grid,
    Avatar,
    Paper,
    TextField,
    Button,
    FormLabel,
    FormControl,
    RadioGroup,
    Radio,
    MenuItem,
    FormControlLabel,
    Autocomplete,
} from "@mui/material";
import Cropper from "react-easy-crop";

/*=====style======*/
const sectionHeaderStyle = {
    backgroundColor: "#046f0bff",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "0 0 0 0",
};

const cardStyle = {
    border: "2px solid #046f0bff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "40px",
    overflow: "hidden"
};
const COLORS = {
    dark: "#1B5E20",
    main: "#2E7D32",
    light: "#E8F5E9",
    mint: "#66BB6A",
    warning: "#FB8C00",
    danger: "#E53935",
};

/*=====define data======*/
const domainOptions = [
    "Artificial Intelligence",
    "Data Science & Analytics",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cyber Security",
    "DevOps",
    "Blockchain & Web3",
    "Internet of Things (IoT)",
    "Game Development",
    "AR / VR / Metaverse",
    "Networking",
    "Database & Big Data",
    "Electronics & Embedded Systems",
    "Robotics & Automation",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biomedical Engineering",
    "Healthcare & Medicine",
    "Pharmacy",
    "Biotechnology",
    "Life Sciences",
    "Business & Management",
    "Finance & Accounting",
    "Economics",
    "Marketing & Sales",
    "Human Resources",
    "Operations & Supply Chain",
    "Entrepreneurship & Startups",
    "Education & Teaching",
    "Law & Legal Studies",
    "Public Administration",
    "Government Services",
    "Social Sciences",
    "Psychology",
    "Counseling & Therapy",
    "Design & Creative Arts",
    "UI / UX Design",
    "Graphic Design",
    "Animation & VFX",
    "Film & Media",
    "Journalism",
    "Content Writing",
    "Digital Marketing",
    "Photography",
    "Fashion & Textile",
    "Architecture & Planning",
    "Interior Design",
    "Construction & Real Estate",
    "Agriculture",
    "Food Technology",
    "Environmental Science",
    "Renewable Energy",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Statistics",
    "Commerce",
    "Banking",
    "Insurance",
    "Logistics & Transportation",
    "Aviation",
    "Marine Studies",
    "Hospitality & Tourism",
    "Hotel Management",
    "Culinary Arts",
    "Sports & Fitness",
    "Yoga & Wellness",
    "Music",
    "Dance",
    "Fine Arts",
    "Language & Linguistics",
    "Translation & Interpretation",
    "History",
    "Geography",
    "Political Science",
    "International Relations",
    "Ethics & Philosophy",
    "Defense & Security",
    "Forensic Science",
    "Criminology",
    "Disaster Management"
];

const subDomainOptions = {

    "Artificial Intelligence": [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Reinforcement Learning",
        "Generative AI",
        "AI Ethics",
        "AI Model Deployment",
        "Edge AI"
    ],

    "Data Science & Analytics": [
        "Data Analysis",
        "Data Visualization",
        "Statistical Analysis",
        "Business Intelligence",
        "Power BI",
        "Tableau",
        "Predictive Analytics",
        "Time Series Analysis",
        "Big Data Analytics"
    ],

    "Software Development": [
        "Backend Development",
        "Frontend Development",
        "Full Stack Development",
        "API Development",
        "Microservices",
        "System Design",
        "Software Architecture",
        "Testing & QA"
    ],

    "Web Development": [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Angular",
        "Vue.js",
        "Node.js",
        "Next.js",
        "Web Performance",
        "Web Security"
    ],

    "Mobile App Development": [
        "Android Development",
        "iOS Development",
        "Flutter",
        "React Native",
        "Kotlin",
        "Swift",
        "Mobile UI Design"
    ],

    "Cloud Computing": [
        "AWS",
        "Microsoft Azure",
        "Google Cloud Platform",
        "Cloud Architecture",
        "Cloud Security",
        "Serverless Computing",
        "Cloud Migration"
    ],

    "Cyber Security": [
        "Ethical Hacking",
        "Penetration Testing",
        "Network Security",
        "Application Security",
        "Cloud Security",
        "SOC Operations",
        "Digital Forensics",
        "Malware Analysis"
    ],

    "DevOps": [
        "CI/CD",
        "Docker",
        "Kubernetes",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Site Reliability Engineering"
    ],

    "Blockchain & Web3": [
        "Blockchain Fundamentals",
        "Smart Contracts",
        "Ethereum",
        "Solidity",
        "DeFi",
        "NFTs",
        "Web3 Development"
    ],

    "Internet of Things (IoT)": [
        "Embedded Systems",
        "Sensor Networks",
        "Industrial IoT",
        "IoT Security",
        "Edge Computing"
    ],

    "Healthcare & Medicine": [
        "Clinical Practice",
        "Medical Diagnostics",
        "Public Health",
        "Telemedicine",
        "Health Informatics",
        "Medical Research"
    ],

    "Business & Management": [
        "Business Strategy",
        "Operations Management",
        "Project Management",
        "Product Management",
        "Business Analytics"
    ],

    "Finance & Accounting": [
        "Financial Analysis",
        "Investment Banking",
        "Stock Market",
        "Corporate Finance",
        "Cost Accounting",
        "Taxation",
        "Auditing"
    ],

    "Marketing & Sales": [
        "Digital Marketing",
        "SEO / SEM",
        "Content Marketing",
        "Brand Management",
        "Sales Strategy",
        "CRM"
    ],

    "Human Resources": [
        "Talent Acquisition",
        "Payroll Management",
        "Employee Relations",
        "HR Analytics",
        "Learning & Development"
    ],

    "Education & Teaching": [
        "School Teaching",
        "Higher Education",
        "Online Teaching",
        "Curriculum Design",
        "Educational Technology"
    ],

    "Law & Legal Studies": [
        "Corporate Law",
        "Criminal Law",
        "Civil Law",
        "Cyber Law",
        "Intellectual Property Rights"
    ],

    "Design & Creative Arts": [
        "Visual Design",
        "Creative Direction",
        "Illustration",
        "Art Theory"
    ],

    "UI / UX Design": [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Design Systems"
    ],

    "Digital Marketing": [
        "SEO",
        "Social Media Marketing",
        "Google Ads",
        "Email Marketing",
        "Marketing Analytics"
    ],

    "Agriculture": [
        "Crop Science",
        "Agricultural Technology",
        "Organic Farming",
        "Agri Business",
        "Soil Science"
    ],

    "Renewable Energy": [
        "Solar Energy",
        "Wind Energy",
        "Hydro Power",
        "Energy Storage",
        "Smart Grids"
    ],

    "Sports & Fitness": [
        "Physical Training",
        "Sports Nutrition",
        "Yoga",
        "Physiotherapy",
        "Mental Fitness"
    ],

    "Language & Linguistics": [
        "Spoken English",
        "Foreign Languages",
        "Translation",
        "Interpretation",
        "Phonetics"
    ]
};

const languageOptions = [
    // 🌍 Global & Most Spoken
    "Tamil",
    "English",
    "Mandarin Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Urdu",
    "Indonesian",
    "German",
    "Japanese",
    "Swahili",
    "Marathi",
    "Telugu",
    "Turkish",
    "Vietnamese",
    "Korean",
    "Italian",
    "Thai",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Odia",
    "Assamese",
    // 🤝 Sign & Special
    "Indian Sign Language (ISL)",
    "American Sign Language (ASL)",
    "British Sign Language (BSL)",
    "International Sign"
];

const initialExpertState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    domain: null,
    subDomain: [],
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",
    pinCode: "",
    mode: "",
    about: "",
    experience: "",
    session: "",
    gender: "",
    rate: "",
    languages: [],
    websiteUrl: "",
    linkedinUrl: "",
    othersUrl: "",
    otherUrl: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    upiId: "",

};
const validators = {
    firstName: (v) => /^[A-Za-z ]+$/.test(v.trim()) && v.trim().length >= 2 ? "" : "First name must be at least 2 characters",
    lastName: (v) => /^[A-Za-z ]+$/.test(v.trim()) && v.trim().length >= 1 ? "" : "Last name must be at least 1 characters",
    email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Invalid email address",
    phone: (v) =>
        /^[6-9]\d{9}$/.test(v) ? "" : "Enter valid 10-digit Indian mobile number",
    dob: (v) =>
        new Date(v) < new Date() ? "" : "Date of birth must be in the past",
    gender: (v) => !!v ? "" : "Gender is required",
    experience: (v) =>
        /^\d+$/.test(v) && Number(v) >= 0 && Number(v) <= 50
            ? "" : "Experience must be a number between 0–50 years",
    session: (v) =>
        /^\d+$/.test(v) && Number(v) >= 0 ? "" : "Sessions must be a positive number",
    rate: (v) =>
        /^\d+$/.test(v) && Number(v) > 0 ? "" : "Rate must be a positive number",
    pinCode: (v) =>
        /^[1-9][0-9]{5}$/.test(v) ? "" : "Pincode must be 6 digits",
    accountHolderName: (v) =>
        /^[A-Za-z ]+$/.test(v.trim()) && v.trim().length >= 2 ? "" : "Account holder name must be at least 2 characters",
    bankName: (v) =>
        /^[A-Za-z ]+$/.test(v.trim()) && v.trim().length >= 2 ? "" : "Bank name must be at least 2 characters",
    accountNumber: (v) =>
        /^\d{9,18}$/.test(v) ? "" : "Account number must be 9–18 digits",
    ifscCode: (v) =>
        /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v) ? "" : "Invalid IFSC code",
    websiteUrl: (v) =>
        /^https?:\/\/.+/.test(v) ? "" : "Invalid website URL",
    linkedinUrl: (v) =>
        /^https?:\/\/(www\.)?linkedin\.com\/.+/.test(v) ? "" : "Invalid LinkedIn URL",
    otherUrl: (v) =>
        !v || /^https?:\/\/.+/.test(v) ? "" : "Invalid other URL",
    othersUrl: (v) =>
        !v || /^https?:\/\/.+/.test(v) ? "" : "Invalid others URL",
    upiId: (v) =>
        !v || /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(v) ? "" : "Invalid UPI ID (e.g. name@bank)",
};

export default function StartupRegistrationForm() {
    /* ---------- Personal & Digital ---------- */
    const [isEditMode, setIsEditMode] = useState(false);
    const [expertId, setExpertId] = useState("");
    const [expert, setExpert] = useState(initialExpertState);
    const [profileImageError, setProfileImageError] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [cropOpen, setCropOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({
        subDomain: false,
        languages: false,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        experience: "",
        session: "",
        rate: "",
        pinCode: "",
        accountNumber: "",
        ifscCode: "",
        websiteUrl: "",
        linkedinUrl: "",
        profileImage: "",
        certifications: "",
        accountHolderName: "",
        bankName: "",
        otherUrl: "",
        othersUrl: "",
        upiId: "",
    });

    /* ---------- Certification ---------- */
    const [certificationInput, setCertificationInput] = useState("");
    const [certificationProof, setCertificationProof] = useState(null);
    const [certifications, setCertifications] = useState([]);
    // [{ name: string, proof: File }]
    const [certificationError, setCertificationError] = useState(false);
    //------------- RESET ------------//
    const handleReset = () => {
        setExpert(initialExpertState);
        setStates([]);
        setDistricts([]);
        setCountryInput("");
        setStateInput("");
        setDistrictInput("");
        // CLEAR IMAGE STATES
        setProfileImage(null);
        setProfileImageError(false);
        setPreview("");
        setImageSrc(null);
        setCropOpen(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        //clear certificate
        setCertificationInput("");
        setCertifications([]);
        setCertificationError(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    /* ---------- Address ---------- */
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countryInput, setCountryInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [districtInput, setDistrictInput] = useState("");

    /* ---------- Input Handlers ---------- */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpert((prev) => ({ ...prev, [name]: value }));
        if (validators[name]) {
            const result = validators[name](value);
            setErrors((prev) => ({
                ...prev,
                [name]: result === true ? "" : result,
            }));
        }
    };
    /*---------string validators-----------*/
    const handleNameInput = (e) => {
        const { name, value } = e.target;

        if (!/^[A-Za-z ]*$/.test(value)) return;

        setExpert((prev) => ({ ...prev, [name]: value }));

        if (validators[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validators[name](value),
            }));
        }
    };
    /*---------upi validators-----------*/
    const handleUpiInput = (e) => {
        const { value } = e.target;
        const lower = value.toLowerCase();

        setExpert((prev) => ({ ...prev, upiId: lower }));

        if (validators.upiId) {
            setErrors((prev) => ({
                ...prev,
                upiId: validators.upiId(lower),
            }));
        }
    };
    /*---------integer validators-----------*/
    const handleNumericInput = (e) => {
        const { name, value } = e.target;

        // 🔒 block strings immediately
        if (!/^\d*$/.test(value)) return;

        setExpert((prev) => ({ ...prev, [name]: value }));

        if (validators[name]) {
            const errorMsg = validators[name](value);
            setErrors((prev) => ({ ...prev, [name]: errorMsg }));
        }
    };

    const handleChange = (e) => {
        setExpert({ ...expert, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // Size validation (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("Image must be less than 2MB");
            e.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result);
            setCropOpen(true);
        };
    };
    const handleCropSave = async () => {
        const canvas = document.createElement("canvas");
        const image = new Image();
        image.src = imageSrc;

        await new Promise((resolve) => (image.onload = resolve));
        if (!croppedAreaPixels) return; // 🔥 ADD THIS LINE
        const { width, height, x, y } = croppedAreaPixels;

        canvas.width = 300;   // 🔒 FINAL FIXED SIZE
        canvas.height = 300;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            0,
            0,
            300,
            300
        );

        canvas.toBlob((blob) => {
            const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
            setProfileImage(file);
            setErrors((prev) => ({ ...prev, profileImage: "" }));
            setPreview(URL.createObjectURL(blob));
            setCropOpen(false);
        }, "image/jpeg");
    };

    const handleCertificationProofChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCertificationProof(file);
    };
    const handleAddCertification = () => {
        if (!certificationInput.trim() || !certificationProof) {
            setCertificationError(true);
            return;
        }
        setCertifications((prev) => [
            ...prev,
            {
                name: certificationInput.trim(),
                proof: certificationProof,
            },
        ]);
        setCertificationInput("");
        setCertificationProof(null);
        setCertificationError(false);
    };

    /* ---------- Fetch Countries ---------- */
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/iso"
                );
                const data = await res.json();
                setCountries(data.data?.map((c) => c.name) || []);
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };
        fetchCountries();
    }, []);

    /* ---------- Address Logic (YOUR API FLOW) ---------- */
    const handleAddressChange = async (field, value, isSelection = false) => {
        let updated = { ...expert };

        if (field === "country") {
            if (!isSelection) return;
            updated = {
                ...updated,
                country: value,
                state: "",
                district: "",
                city: "",
                area: "",
                pinCode: "",
            };
            setStates([]);
            setDistricts([]);

            try {
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/states",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ country: value }),
                    }
                );
                const data = await res.json();
                setStates(data.data?.states?.map((s) => s.name) || []);
            } catch (e) {
                console.error(e);
            }
        }

        if (field === "state") {
            if (!isSelection) return;
            updated = {
                ...updated,
                state: value,
                district: "",
                city: "",
                area: "",
                pinCode: "",
            };
            setDistricts([]);

            try {
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/state/cities",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            country: expert.country,
                            state: value,
                        }),
                    }
                );
                const data = await res.json();
                setDistricts(data.data || []);
            } catch (e) {
                console.error(e);
            }
        }

        if (field === "district") {
            updated = { ...updated, district: value, city: "", area: "", pinCode: "" };
        }
        if (["city", "area"].includes(field)) {
            updated = { ...updated, [field]: value };
        }
        if (field === "pinCode") {
            if (!/^\d*$/.test(value)) return; // block letters

            updated.pinCode = value;

            // ✅ validate pincode
            const errorMsg =
                /^[1-9][0-9]{5}$/.test(value)
                    ? ""
                    : "Pincode must be 6 digits";

            setErrors((prev) => ({
                ...prev,
                pinCode: errorMsg,
            }));
        }


        setExpert(updated);
    };

    /*---------- Form Validation ---------- */
    const validateForm = () => {
        let newErrors = {};

        Object.keys(validators).forEach((field) => {
            const value = expert[field];
            const errorMsg = validators[field](value);

            if (errorMsg) {
                newErrors[field] = errorMsg;
            }
        });

        if (!expert.domain) newErrors.domain = "Domain is required";
        if (expert.subDomain.length === 0) newErrors.subDomain = "Select at least one sub-domain";
        if (expert.languages.length === 0) newErrors.languages = "Select at least one language";
        if (!profileImage && !preview) newErrors.profileImage = "Profile image required";
        if (certifications.length === 0) newErrors.certifications = "At least one certification required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    /* ---------- Fetch Expert (Edit Mode) ---------- */
    const fetchExpertById = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:8000/expert/by-id/${id}`
            );
            const data = await res.json();

            if (!res.ok || data.error) {
                alert("Expert not found");
                return;
            }

            setExpert({ ...initialExpertState, ...data });

            // Autocomplete sync
            setCountryInput(data.country || "");
            setStateInput(data.state || "");
            setDistrictInput(data.district || "");

            // Profile image preview
            if (data.profileImage) {
                setPreview(`http://localhost:8000/${data.profileImage}`);
            }

            // Certifications
            if (data.certifications) {
                setCertifications(
                    data.certifications.map(c => ({
                        name: c.name,
                        proof: null
                    }))
                );
            }

            setIsEditMode(true);
            setExpertId(data.expertId);
        } catch (err) {
            console.error(err);
            alert("Fetch failed");
        }
    };
    /* ---------- Delete Expert ---------- */
    const handleDelete = async () => {
        if (!expertId) return;
        if (!window.confirm("Delete this expert?")) return;

        const res = await fetch(
            `http://localhost:8000/expert/by-id/${expertId}`,
            { method: "DELETE" }
        );
        if (res.ok) {
            alert("Deleted successfully");
            handleReset();
            setIsEditMode(false);
            setExpertId("");
        }
    };
    /* ---------- Submit ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        //  Certification proof validation
        if (certifications.length < 1) {
            setCertificationError(true);
            hasError = true;
        }
        //  Sub domain validation
        if (expert.subDomain.length < 1) {
            setErrors((prev) => ({ ...prev, subDomain: true }));
            hasError = true;
        }
        //  language validation
        if (expert.languages.length < 1) {
            setErrors((prev) => ({ ...prev, languages: true }));
            hasError = true;
        }
        if (!profileImage) {
            setProfileImageError(true);
            hasError = true;
        }
        if (hasError) return;
        // Full form validation
        if (!validateForm()) return;

        // ✅ All validations passed
        const expertData = {
            ...expert,
            certifications: certifications.map((c) => ({
                name: c.name,
                Proof: c.proof.name,
            })),
        };
        const formData = new FormData();
        formData.append("expertData", JSON.stringify(expertData));
        formData.append("image", profileImage);

        certifications.forEach((cert) => {
            formData.append("certProofs", cert.proof);
        });

        try {
            const res = await fetch(
                isEditMode
                    ? `http://localhost:8000/expert/${expertId}`
                    : "http://localhost:8000/expert",
                {
                    method: isEditMode ? "PUT" : "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert("Registration failed");
                return;
            }
            alert(`Expert registered successfully!\nYour Expert ID is: ${data.expertId}`);
            handleReset();

        } catch (error) {
            console.error("API Error:", error);
            alert("Server error");
        }

        handleReset();
    };

    /* ========== main =========== */
    return (
        <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>
            <Box
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.main})`,
                    color: "#fff",
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Expert Profile
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                    Empowering founders with strategic guidance and execution-focused mentorship
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                        const id = prompt("Enter Expert ID");
                        if (id) fetchExpertById(id);
                    }}
                >
                    Fetch Expert
                </Button>
            </Box>

            <form onSubmit={handleSubmit}>
                {/* ================= PERSONAL INFO ================= */}
                <Paper sx={cardStyle}>
                    <Box sx={sectionHeaderStyle}>
                        <Typography variant="h6">Personal Information</Typography>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="First Name" required name="firstName" value={expert.firstName} onChange={handleNameInput} error={!!errors.firstName}
                                    helperText={errors.firstName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Last Name" required name="lastName" value={expert.lastName} onChange={handleNameInput} error={!!errors.lastName}
                                    helperText={errors.lastName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth type="email" label="Email Address" required name="email" value={expert.email} onChange={handleInputChange} error={!!errors.email}
                                    helperText={errors.email} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Phone Number" required name="phone" value={expert.phone} onChange={handleNumericInput} error={!!errors.phone}
                                    helperText={errors.phone} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth type="date" label="Date of Birth"
                                    InputLabelProps={{ shrink: true }} required name="dob"
                                    value={expert.dob} onChange={handleInputChange}
                                    inputProps={{ max: new Date().toISOString().split("T")[0] }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl component="fieldset">
                                    <FormLabel required component="legend">Gender</FormLabel>
                                    <RadioGroup row name="gender" value={expert.gender || ""} onChange={handleInputChange}>
                                        <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                                        <FormControlLabel value="others" control={<Radio color="success" />} label="Others" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                {/* ================= LOCATION ================= */}
                <Paper sx={cardStyle}>
                    <Box sx={sectionHeaderStyle}>
                        <Typography variant="h6">Expert Address</Typography>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {/* Country */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Autocomplete
                                    options={Array.isArray(countries) ? countries : []}
                                    inputValue={countryInput}
                                    onInputChange={(event, newInputValue) => {
                                        setCountryInput(newInputValue);
                                    }}
                                    onChange={(event, newValue) => {
                                        setCountryInput(newValue || "");

                                        setExpert((prev) => ({
                                            ...prev,
                                            country: newValue || "",
                                            state: "",
                                            district: "",
                                            city: "",
                                            area: "",
                                            pinCode: "",
                                        }));

                                        setStates([]);
                                        setDistricts([]);

                                        if (newValue) {
                                            handleAddressChange("country", newValue, true);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" required error={!!errors.country} helperText={errors.country} />
                                    )}
                                />
                            </Grid>
                            {/* State */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Autocomplete
                                    options={Array.isArray(states) ? states : []}
                                    inputValue={stateInput}
                                    onInputChange={(e, v) => setStateInput(v)}
                                    onChange={(e, v) => {
                                        setStateInput(v || "");
                                        handleAddressChange("state", v, true);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="State" disabled={!expert.country} required error={!!errors.state} helperText={errors.state} />
                                    )}
                                />
                            </Grid>
                            {/* District */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Autocomplete
                                    options={Array.isArray(districts) ? districts : []}
                                    inputValue={districtInput}
                                    onInputChange={(e, v) => setDistrictInput(v)}
                                    onChange={(e, v) => {
                                        setDistrictInput(v || "");
                                        handleAddressChange("district", v, true);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="District" disabled={!expert.state} required error={!!errors.district} helperText={errors.district} />
                                    )}
                                />
                            </Grid>
                            {/* City */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    required
                                    disabled={!expert.district}
                                    value={expert.city}
                                    onChange={(e) => handleAddressChange("city", e.target.value)}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>
                            {/* Area */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Area"
                                    disabled={!expert.city}
                                    value={expert.area}
                                    onChange={(e) => handleAddressChange("area", e.target.value)}
                                    error={!!errors.area}
                                    helperText={errors.area}
                                    required
                                />
                            </Grid>
                            {/* Pincode */}
                            <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    disabled={!expert.area}
                                    value={expert.pinCode}
                                    onChange={(e) => handleAddressChange("pinCode", e.target.value)}
                                    inputProps={{
                                        maxLength: 6,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }}
                                    error={!!errors.pinCode}
                                    helperText={errors.pinCode}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                {/* ================= EXPERT DETAILS ================= */}
                <Paper sx={cardStyle}>
                    <Box sx={sectionHeaderStyle}>
                        <Typography variant="h6">
                            Expert Details
                        </Typography>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Autocomplete
                                    options={domainOptions}
                                    value={expert.domain}
                                    onChange={(e, newValue) =>
                                        setExpert((prev) => ({
                                            ...prev,
                                            domain: newValue,
                                            subDomain: [], // reset sub-domains when domain changes
                                        }))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Domain" required error={!!errors.domain} helperText={errors.domain} />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Autocomplete
                                    multiple
                                    options={expert.domain ? subDomainOptions[expert.domain] || [] : []}
                                    value={expert.subDomain}
                                    getOptionDisabled={(option) =>
                                        expert.subDomain.length >= 3 &&
                                        !expert.subDomain.includes(option)
                                    }
                                    onChange={(e, newValue) => {
                                        if (newValue.length <= 3) {
                                            setExpert((prev) => ({
                                                ...prev,
                                                subDomain: newValue,
                                            }));
                                            // 🔥 clear error once at least 1 selected
                                            if (newValue.length > 0) {
                                                setErrors((prev) => ({ ...prev, subDomain: false }));
                                            }
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Sub Domain (Max 3)"
                                            error={errors.subDomain}
                                            helperText={
                                                errors.subDomain
                                                    ? "Please select at least one sub-domain"
                                                    : `${expert.subDomain.length}/3 selected`
                                            }
                                        />
                                    )}
                                    disabled={!expert.domain}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField select fullWidth required label="Mode" name="mode" value={expert.mode || ""} onChange={handleChange}>
                                    <MenuItem value="Online">Online</MenuItem>
                                    <MenuItem value="Offline">Offline</MenuItem>
                                    <MenuItem value="Online, Offline">Online & Offline</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth required label="Experience(in yrs)" name="experience" value={expert.experience} onChange={handleNumericInput}
                                    inputProps={{
                                        maxLength: 2,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }} error={!!errors.experience} helperText={errors.experience} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth required label="Sessions Completed" name="session" value={expert.session} onChange={handleNumericInput}
                                    inputProps={{
                                        maxLength: 5,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }} error={!!errors.session} helperText={errors.session} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth required label="Rate (₹ / hr)" name="rate" value={expert.rate} onChange={handleNumericInput}
                                    inputProps={{
                                        maxLength: 7,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }} error={!!errors.rate} helperText={errors.rate} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        label="Certification Course Name"
                                        value={certificationInput}
                                        error={certificationError}
                                        helperText={
                                            certificationError
                                                ? "Please enter course name and upload proof"
                                                : ""
                                        }
                                        onChange={(e) => setCertificationInput(e.target.value)}
                                    />
                                    <Button variant="outlined" component="label" sx={{ mt: 1, mr: 1, p: 1 }}>
                                        Upload Certification Proof
                                        <input
                                            type="file"
                                            hidden
                                            accept=".pdf,image/*"
                                            onChange={handleCertificationProofChange}
                                        />
                                    </Button>
                                    {certificationProof && (
                                        <Typography variant="body2" mt={1}>
                                            📄 {certificationProof.name}
                                        </Typography>
                                    )}
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 1, p: 1 }}
                                        onClick={handleAddCertification}
                                    > Add Certification
                                    </Button>
                                    {/* Certification List */}
                                    {certifications.length > 0 && (
                                        <Box mt={2}>
                                            {certifications.map((cert, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        bgcolor: "#f1f8f4",
                                                        p: 1,
                                                        mb: 1,
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography variant="body2">
                                                            🎓 {cert.name}
                                                        </Typography>
                                                        <Typography variant="caption">
                                                            📄 {cert.proof?.name || "Previously uploaded"}
                                                        </Typography>
                                                    </Box>
                                                    <Button
                                                        color="error"
                                                        size="small"
                                                        onClick={() =>
                                                            setCertifications((prev) =>
                                                                prev.filter((_, i) => i !== index)
                                                            )
                                                        }
                                                    >  Remove
                                                    </Button>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Autocomplete
                                    multiple
                                    options={languageOptions}
                                    value={expert.languages}
                                    onChange={(e, newValue) => {
                                        setExpert((prev) => ({
                                            ...prev,
                                            languages: newValue,
                                        })); // 🔥 clear error once at least 1 selected
                                        if (newValue.length > 0) {
                                            setErrors((prev) => ({ ...prev, languages: false }));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Languages Known"
                                            error={errors.languages}
                                            helperText={
                                                errors.languages
                                                    ? "Please select at least one language"
                                                    : `${expert.languages.length} selected`
                                            }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField multiline rows={2} fullWidth required label="About Expert" name="about" value={expert.about} onChange={handleChange} error={!!errors.about} helperText={errors.about} />
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Avatar
                                        src={preview}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mb: 2,
                                            border: profileImageError
                                                ? "2px solid red"
                                                : "3px solid #1976d2",
                                        }}
                                    />
                                    {cropOpen && (
                                        <Box
                                            sx={{
                                                position: "fixed",
                                                inset: 0,
                                                bgcolor: "rgba(0,0,0,0.7)",
                                                zIndex: 1300,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box sx={{ width: 400, height: 450, bgcolor: "#fff", p: 2, borderRadius: 2 }}>
                                                <Box sx={{ position: "relative", width: "100%", height: 300 }}>
                                                    <Cropper
                                                        image={imageSrc}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        aspect={1}   // 🔒 FIXED 1:1 (LinkedIn style)
                                                        onCropChange={setCrop}
                                                        onZoomChange={setZoom}
                                                        onCropComplete={(_, croppedPixels) =>
                                                            setCroppedAreaPixels(croppedPixels)
                                                        }
                                                    />
                                                </Box>
                                                <Box sx={{ mt: 2 }}>
                                                    <Typography variant="body2">Zoom</Typography>
                                                    <input
                                                        type="range"
                                                        min={1}
                                                        max={3}
                                                        step={0.1}
                                                        value={zoom}
                                                        onChange={(e) => setZoom(e.target.value)}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                                    <Button color="error" onClick={() => setCropOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="contained" onClick={handleCropSave}>
                                                        Save
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                    <Button
                                        variant="outlined"
                                        component="label"
                                    >
                                        Upload Profile Image
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {profileImageError && (
                                        <Typography color="error" variant="caption" display="block" mt={1}>
                                            Profile image is required
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Box>
                </Paper>
                {/* ================= BANK DETAILS ================= */}
                <Paper sx={cardStyle}>
                    <Box sx={sectionHeaderStyle}>
                        <Typography variant="h6">
                            Bank Details
                        </Typography>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Account Holder Name"
                                    name="accountHolderName"
                                    value={expert.accountHolderName || ""}
                                    onChange={handleNameInput}
                                    error={!!errors.accountHolderName} helperText={errors.accountHolderName}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Bank Name"
                                    name="bankName"
                                    value={expert.bankName || ""}
                                    onChange={handleNameInput}
                                    error={!!errors.bankName} helperText={errors.bankName}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    label="Account Number"
                                    name="accountNumber"
                                    value={expert.accountNumber || ""}
                                    onChange={handleNumericInput}
                                    error={!!errors.accountNumber} helperText={errors.accountNumber}
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="IFSC Code"
                                    name="ifscCode"
                                    value={expert.ifscCode || ""}
                                    onChange={handleInputChange}
                                    error={!!errors.ifscCode} helperText={errors.ifscCode}
                                    placeholder="SBIN0000123"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Account Type"
                                    name="accountType"
                                    value={expert.accountType || ""}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Select Account Type</MenuItem>
                                    <MenuItem value="Savings">Savings</MenuItem>
                                    <MenuItem value="Current">Current</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="UPI ID (Optional)"
                                    name="upiId"
                                    value={expert.upiId || ""}
                                    onChange={handleUpiInput}
                                    error={!!errors.upiId} helperText={errors.upiId}
                                    placeholder="name@bank"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* ================= DIGITAL ================= */}
                <Paper sx={cardStyle}>
                    <Box sx={sectionHeaderStyle}>
                        <Typography variant="h6">Digital & Social Presence</Typography>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {/* Official Website */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    type="url"
                                    label="Official Website URL"
                                    name="websiteUrl"
                                    required
                                    value={expert.websiteUrl}
                                    onChange={handleInputChange}
                                    error={!!errors.websiteUrl} helperText={errors.websiteUrl}
                                    placeholder="https://example.com"
                                />
                            </Grid>

                            {/* LinkedIn */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    type="url"
                                    label="LinkedIn Page URL"
                                    name="linkedinUrl"
                                    required
                                    value={expert.linkedinUrl}
                                    onChange={handleInputChange}
                                    error={!!errors.linkedinUrl} helperText={errors.linkedinUrl}
                                    placeholder="https://linkedin.com/company/example"
                                />
                            </Grid>

                            {/* Instagram */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    type="url"
                                    label="Other Page URL"
                                    name="othersUrl"
                                    value={expert.othersUrl}
                                    error={!!errors.othersUrl} helperText={errors.othersUrl}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            {/* Facebook */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    type="url"
                                    label="Other Page URL"
                                    name="otherUrl"
                                    value={expert.otherUrl || ""}
                                    error={!!errors.otherUrl} helperText={errors.otherUrl}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                {/* ================= Button ================= */}
                <Box
                    textAlign="center"
                    mt={4}
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                >
                    <Button
                        type="button"
                        variant="outlined"
                        color={isEditMode ? "warning" : "success"}
                        onClick={isEditMode ? handleDelete : handleReset}
                    >
                        {isEditMode ? "Delete" : "Reset"}
                    </Button>


                    <Button type="submit" variant="contained" color="success">
                        {isEditMode ? "Update" : "Submit"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
