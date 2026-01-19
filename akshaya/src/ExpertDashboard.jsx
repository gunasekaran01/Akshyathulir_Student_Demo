import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  TextField,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* ================= FILTER SECTION ================= */
function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer", fontWeight: 600 }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Typography>{open ? "⮙" : "⮛"}</Typography>
      </Box>
      {open && <Box sx={{ mt: 1 }}>{children}</Box>}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value }) {
  return (
    <Paper sx={{ p: 2, textAlign: "center", background: "#eeeeee78" }}>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}

/* ================= DATA ================= */
const experts = [
  {
    id: 1,
    name: "Dr. Karthikeyan S",
    expertise: "Academic Mentorship,placement Training",
    category: "College",
    city: "Coimbatore",
    mode: "Offline,online",
    image: "https://i.pravatar.cc/150?img=12",
    about: "Guides students in academics and research",
    Experience: "5 years",
    session: "100+",
    gender: "Male",
    rate: "₹300 / hr",
    certifications: "PhD, UGC",
    languages: "English, tamil",
  },
  {
    id: 2,
    name: "Anitha",
    expertise: "Placement Training",
    category: "College",
    city: "Chennai",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=47",
    about: "Interview and placement preparation expert",
    Experience: "4 years",
    session: "200+",
    gender: "Female",
    rate: "₹400 / hr",
    certifications: "HR Certified",
    languages: "English, Tamil",
  },
  {
    id: 3,
    name: "Priya Sharma",
    expertise: "LivestockTech",
    category: "Startup",
    city: "Bengaluru",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=45",
    about: "Livestock startup advisor",
    Experience: "6 years",
    session: "250+",
    gender: "Female",
    rate: "₹500 / hr",
    certifications: "ISO",
    languages: "English, Hindi",
  },
  {
    id: 4,
    name: "Arun Prakash",
    expertise: "AgriTech",
    category: "Startup",
    city: "Coimbatore",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=56",
    about: "Agri startup product consultant",
    Experience: "2 years",
    session: "50+",
    gender: "Male",
    rate: "₹350 / hr",
    certifications: "Startup Mentor",
    languages: "English, Tamil",
  },
  {
    id: 5,
    name: "Prof. Ramesh Kumar",
    expertise: "Project Guidance",
    category: "College",
    city: "Bengaluru",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=59",
    about: "Final year project and innovation mentor",
    Experience: "2 years",
    session: "150+",
    gender: "Male",
    rate: "₹250 / hr",
    certifications: "M.Tech",
    languages: "Tamil, English",
  },
  {
    id: 6,
    name: "Meena Devi",
    expertise: "Startup Marketing",
    category: "Startup",
    city: "Madurai",
    mode: "Online, Offline",
    image: "https://i.pravatar.cc/150?img=5",
    about: "Growth & digital marketing mentor",
    Experience: "1 year",
    session: "25+",
    gender: "Female",
    rate: "₹200 / hr",
    certifications: "Digital Marketing",
    languages: "Tamil, English",
  },
  {
    id: 7,
    name: "Suresh Iyer",
    expertise: "Product Strategy",
    category: "Startup",
    city: "Coimbatore",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=65",
    about: "Product roadmap & scaling expert",
    Experience: "6 years",
    session: "250+",
    gender: "Male",
    rate: "₹600 / hr",
    certifications: "Product Owner",
    languages: "English",
  },
  {
    id: 8,
    name: "Vikram Reddy",
    expertise: "Agri Finance",
    category: "Startup",
    city: "Hyderabad",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=68",
    about: "Advisor for agri startups on funding, valuation and investor readiness",
    Experience: "7 years",
    session: "300+",
    gender: "Male",
    rate: "₹700 / hr",
    certifications: "MBA Finance, CFA Level 1",
    languages: "English, Telugu",
  },
  {
    id: 9,
    name: "Lakshmi Narayanan",
    expertise: "Supply Chain Management",
    category: "Startup",
    city: "Salem",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=28",
    about: "Helps agri businesses optimize logistics and cold chain systems",
    Experience: "5 years",
    session: "120+",
    gender: "Female",
    rate: "₹450 / hr",
    certifications: "SCM Professional",
    languages: "Tamil, English",
  },
  {
    id: 10,
    name: "Rahul Mehta",
    expertise: "Agri Export Consulting",
    category: "Startup",
    city: "Mumbai",
    mode: "Online, Offline",
    image: "https://i.pravatar.cc/150?img=8",
    about: "Mentors startups on international agri exports and compliance",
    Experience: "8 years",
    session: "180+",
    gender: "Male",
    rate: "₹800 / hr",
    certifications: "Export Compliance Specialist",
    languages: "English, Hindi",
  },
  {
    id: 11,
    name: "Sivakumar P",
    expertise: "Farm Automation",
    category: "College",
    city: "Erode",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=57",
    about: "Academic mentor in IoT-based farm automation and smart irrigation",
    Experience: "6 years",
    session: "140+",
    gender: "Male",
    rate: "₹350 / hr",
    certifications: "IoT Certified Trainer",
    languages: "Tamil, English",
  },
  {
    id: 12,
    name: "Neha Kulkarni",
    expertise: "Agri Product Marketing",
    category: "Startup",
    city: "Pune",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=32",
    about: "Supports agri startups with branding, GTM strategy, and growth marketing",
    Experience: "4 years",
    session: "90+",
    gender: "Female",
    rate: "₹420 / hr",
    certifications: "Digital Marketing Strategist",
    languages: "English, Hindi",
  },
  {
    id: 13,
    name: "Kavitha R",
    expertise: "Agri Business Strategy",
    category: "Startup",
    city: "Trichy",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=41",
    about: "Helps agri startups build sustainable business models and scale operations",
    Experience: "6 years",
    session: "160+",
    gender: "Female",
    rate: "₹480 / hr",
    certifications: "MBA, Startup India Mentor",
    languages: "Tamil, English",
  },
  {
    id: 14,
    name: "Mohammed Faisal",
    expertise: "Dairy Farm Management",
    category: "Startup",
    city: "Vellore",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=54",
    about: "Advises dairy farms on productivity, health management, and automation",
    Experience: "7 years",
    session: "210+",
    gender: "Male",
    rate: "₹550 / hr",
    certifications: "Certified Dairy Technologist",
    languages: "Tamil, English",
  },
  {
    id: 15,
    name: "Ritika Malhotra",
    expertise: "Agri HR & Talent",
    category: "College",
    city: "Delhi",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=44",
    about: "Guides agri startups on hiring, HR policies, and team building",
    Experience: "5 years",
    session: "130+",
    gender: "Female",
    rate: "₹400 / hr",
    certifications: "HR Analytics Certified",
    languages: "English, Hindi",
  },
  {
    id: 16,
    name: "Senthil Kumar",
    expertise: "Soil Health & Crop Planning",
    category: "College",
    city: "Thanjavur",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=51",
    about: "Supports farmers and startups with soil testing and crop planning strategies",
    Experience: "8 years",
    session: "300+",
    gender: "Male",
    rate: "₹320 / hr",
    certifications: "Soil Science Specialist",
    languages: "Tamil, English",
  },


];


/* ================= MAIN ================= */
export default function CropSmileExpertProfile() {
  const [expertise, setExpertise] = useState("");
  const [language, setLanguage] = useState("");
  const [mode, setMode] = useState("");
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [view, setView] = useState("LIST");
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [proofImage, setProofImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = React.useRef(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const toTitleCase = (str) =>
    str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const expertiseOptions = [...new Set(experts.flatMap(e => e.expertise.split(",")).map(x => x.trim().toLowerCase()))];
  const languageOptions = [...new Set(experts.flatMap(e => e.languages.split(",")).map(x => x.trim().toLowerCase()))];
  const modeOptions = [...new Set(experts.flatMap(e => e.mode.split(",")).map(x => x.trim().toLowerCase()))];
  /*====================== filter logic=============*/
  const filteredExperts = experts.filter(e => {
    const exps = e.expertise.toLowerCase().split(",").map(x => x.trim());
    const langs = e.languages.toLowerCase().split(",").map(x => x.trim());
    const modes = e.mode.toLowerCase().split(",").map(x => x.trim());
    return (
      (expertise === "" || exps.includes(expertise)) &&
      (language === "" || langs.includes(language)) &&
      (mode === "" || modes.includes(mode))
    );
  });

  /* ================= DASHBOARD ================= */
  if (view === "DASHBOARD" && selectedExpert) {
    return (
      <Box sx={{ p: 4, bgcolor: "#f4fbf3", minHeight: "100vh" }}>
        <Button
          variant="contained"
          onClick={() => {
            setView("LIST");
            setSelectedExpert(null);
          }} sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }}
        >
          ← Back to Experts
        </Button>

        <Paper sx={{ p: 4, mt: 3 }}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "flex-start" },
          }}
          >
            <img src={selectedExpert.image} alt="expertise" width={160} height={160} style={{ borderRadius: "50%" }} />
            <Box>
              <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {selectedExpert.name} <VerifiedIcon color="success" fontSize="medium" />
              </Typography>
              <Typography color="success.main">{selectedExpert.expertise}</Typography>
              <Typography><b>City:</b> {selectedExpert.city}</Typography>
              <Typography><b>Mode:</b> {selectedExpert.mode}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              mt: 3,
            }}
          >
            <StatCard title="Experience" value={selectedExpert.Experience} />
            <StatCard title="Sessions" value={selectedExpert.session} />
            <StatCard title="Rate" value={selectedExpert.rate} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h4">About</Typography>
            <Typography>{selectedExpert.about}</Typography><br />
            <Typography variant="h4">Additional Details</Typography>
            <Typography><b>Gender:</b>{selectedExpert.gender}</Typography>
            <Typography><b>Certifications:</b>{selectedExpert.certifications}</Typography>
            <Typography><b>Languages:</b>{selectedExpert.languages}</Typography>
          </Box>


          <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip label={selectedExpert.expertise} />
            <Chip label="Career Guidance" />
            <Chip label="Startup Growth" />
            <Chip label="Problem Solving" />
          </Box>

          <Box sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
          }}>
            <Button variant="contained" onClick={() => setView("BOOKING")} sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }}>
              📅 Confirm Booking
            </Button>
            <Button variant="contained" sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }} color="warning">💬 Chat</Button>
            <Button variant="contained" sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }} color="success">📞call</Button>

          </Box>
        </Paper>
      </Box>
    );
  }

  /* ================= BOOKING ================= */
  if (view === "BOOKING" && selectedExpert) {
    return (
      <Box sx={{ p: 4, bgcolor: "#f4fbf3", minHeight: "100vh" }}>
        <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Book Session for {selectedExpert.name}
          </Typography>
          <TextField
            fullWidth
            required
            label="Your Name"
            sx={{ mb: 2 }}
            value={bookingData.name}
            onChange={(e) =>
              setBookingData({ ...bookingData, name: e.target.value })
            }
          />

          <TextField
            fullWidth
            required
            label="Email"
            sx={{ mb: 2 }}
            value={bookingData.email}
            onChange={(e) =>
              setBookingData({ ...bookingData, email: e.target.value })
            }
          />

          <TextField
            required
            fullWidth
            label="Phone Number"
            sx={{ mb: 2 }}
            value={bookingData.phone}
            onChange={(e) =>
              setBookingData({ ...bookingData, phone: e.target.value })
            }
          />

          <TextField
            fullWidth
            required
            type="date"
            label="Preferred Date"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            value={bookingData.date}
            onChange={(e) =>
              setBookingData({ ...bookingData, date: e.target.value })
            }
          />

          <TextField
            fullWidth
            required
            type="time"
            label="Preferred Time"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            value={bookingData.time}
            onChange={(e) =>
              setBookingData({ ...bookingData, time: e.target.value })
            }
          />


          <TextField
            fullWidth
            multiline
            rows={3}
            label="Additional Notes"
            sx={{ mb: 2 }}
            value={bookingData.notes}
            onChange={(e) =>
              setBookingData({ ...bookingData, notes: e.target.value })
            }
          />

          {/* IMAGE PROOF UPLOAD */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 2 }}>Upload the proof(Screenshot):</Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={imageError ? "error" : "primary"}
            >
              {proofImage ? proofImage.name : "Upload Proof Image *"}

              <input
                type="file"
                accept="image/*"
                hidden
                required
                onChange={(e) => {
                  setProofImage(e.target.files[0]);
                  setImageError(false);
                }}
              />
            </Button>

            {imageError && (
              <Typography variant="caption" color="error">
                Proof image is required
              </Typography>
            )}
          </Box>



          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" color="warning" onClick={() =>{ setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });

    setProofImage(null);
    setImageError(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
     setView("DASHBOARD");
  }}sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }}>Back</Button>
            

            <Button
              variant="contained"
              onClick={() => {
                // 🔴 Image proof validation (added)
                if (!proofImage) {
                  setImageError(true);
                  alert("Please upload proof image ❗");
                  return;
                }

                const finalBooking = {
                  expert: {
                    id: selectedExpert.id,
                    name: selectedExpert.name,
                    expertise: selectedExpert.expertise,
                    mode: selectedExpert.mode,
                    rate: selectedExpert.rate,
                  },
                  user: bookingData,
                  proofFile: proofImage.name, // ✅ filename only
                  bookedAt: new Date().toISOString(),
                };

                // 🔴 Existing validation (UNCHANGED)
                if (
                  !bookingData.name ||
                  !bookingData.email ||
                  !bookingData.phone ||
                  !bookingData.date ||
                  !bookingData.time
                ) {
                  alert("Please fill all required fields");
                  return;
                }

                // ✅ Final console output
                console.log(" BOOKING DETAILS:", finalBooking);

                alert("Session Booked");
                 setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });

    setProofImage(null);
    setImageError(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Optional navigation
    setView("DASHBOARD"); // or "DASHBOARD"
  
              }}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-3px) scale(1.03)" },
              }}
            >
              submit
            </Button>
            
          </Box>
        </Paper>
      </Box>
    );
  }

  /* ================= LIST ================= */
  return (
    <Box sx={{ bgcolor: "#f4fbf3", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px auto" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Paper
          sx={{
            p: 3,
            width: 280,
            minWidth: 280,
            maxWidth: 280,
            height: "fit-content",
          }}
        >
          {/* MOBILE FILTER HEADER */}
          {isMobile && (
            <Box
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <Typography variant="h6">Filters</Typography>
              <ExpandMoreIcon
                sx={{
                  transform: mobileFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </Box>
          )}

          {/* DESKTOP TITLE */}
          {!isMobile && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filters
            </Typography>
          )}

          {/* FILTER CONTENT */}
          {(!isMobile || mobileFilterOpen) && (
            <>
              {/* EXPERTISE */}
              <FilterSection title="Expertise">
                <RadioGroup
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                >
                  <FormControlLabel value="" control={<Radio />} label="All" />
                  {expertiseOptions.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={toTitleCase(item)}
                    />
                  ))}
                </RadioGroup>
              </FilterSection>

              {/* LANGUAGES */}
              <FilterSection title="Languages">
                <RadioGroup
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <FormControlLabel value="" control={<Radio />} label="All" />
                  {languageOptions.map((lang) => (
                    <FormControlLabel
                      key={lang}
                      value={lang}
                      control={<Radio />}
                      label={toTitleCase(lang)}
                    />
                  ))}
                </RadioGroup>
              </FilterSection>

              {/* MODE */}
              <FilterSection title="Mode">
                <RadioGroup
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <FormControlLabel value="" control={<Radio />} label="All" />
                  {modeOptions.map((m) => (
                    <FormControlLabel
                      key={m}
                      value={m}
                      control={<Radio />}
                      label={toTitleCase(m)}
                    />
                  ))}
                </RadioGroup>
              </FilterSection>
            </>
          )}
        </Paper>

        {/* STABLE GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 260px)",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >{filteredExperts.length === 0 ? (
          <Box
            sx={{
              gridColumn: "1 / -1",
              textAlign: "center",
              py: 6,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6">
              No experts found
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Try changing filters or clear some options.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => {
                setExpertise("");
                setLanguage("");
                setMode("");
              }}
            >
              Clear Filters
            </Button>
          </Box>
        ) : (
          filteredExperts.map((e) => (
            <Paper
              key={e.id}
              sx={{
                p: 2,
                width: 260,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                rowGap: 3,
                textAlign: "center",
              }}
            >
              <img
                src={e.image}
                alt="expert"
                width={110}
                height={110}
                style={{ borderRadius: "50%", margin: "0 auto" }}
              />

              <Box>
                <Typography variant="h6">{e.name}</Typography>
                <Typography color="success.main">{e.expertise}</Typography>
                <Typography variant="body2">
                  {e.city} • {e.mode}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  setSelectedExpert(e);
                  setView("DASHBOARD");
                }} sx={{ transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px) scale(1.03)", }, }}
              >
                Book Now
              </Button>
            </Paper>
          )))}
        </Box>
      </Box>
    </Box>
  );
}
