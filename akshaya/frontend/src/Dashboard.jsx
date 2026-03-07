import { useState, useEffect } from "react";
import axios from "axios";
/* ===== MUI IMPORTS ===== */
import {
    Box,
    Button,
    Paper,
    Typography,
    Divider,
    Grid,
    Avatar,
    Stack,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
/* ===== MUI ICONS (REPLACED) ===== */
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TuneIcon from "@mui/icons-material/Tune";
import Rating from "@mui/material/Rating";
/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
    <Paper sx={{ p: 2, px: 8, textAlign: "center", borderRadius: 2, background: "#eeeeee78" }}>
        <Typography variant="h6">{value}</Typography>
        <Typography color="text.secondary">{title}</Typography>
    </Paper>
);
function Test() {
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [ratings, setRatings] = useState({});
    const [experts, setExperts] = useState([]);
    const [sponsoredAds, setSponsoredAds] = useState([]);
    const [view, setView] = useState("LIST");
    const [filters, setFilters] = useState({
        domain: [],
        subdomain: [],
        mode: [],
        language: [],
    });

    useEffect(() => {
        const fetchExperts = async () => {
            try {

                const res = await axios.get("http://localhost:8000/experts");
                const formatted = res.data.map((e) => ({
                    ...e,
                    name: `${e.firstName} ${e.lastName}`,
                    skill: e.domain,
                    img: `http://localhost:8000/${e.profileImage}`,
                }));
                setExperts(formatted);
                fetchRatings(res.data);

            } catch (err) {
                console.error("Experts load error", err);
            }
        };

        const fetchRatings = async (expertList) => {

            let ratingMap = {};

            for (const expert of expertList) {

                const res = await axios.get(
                    `http://localhost:8000/rating/${expert.expertId}`
                );

                const data = res.data;

                if (data.length === 0) {
                    ratingMap[expert.expertId] = 0;
                    continue;
                }

                const avg =
                    data.reduce((sum, r) => sum + r.rating, 0) / data.length;

                ratingMap[expert.expertId] = avg.toFixed(1);
            }

            setRatings(ratingMap);
        };

        fetchExperts();

    }, []);
    useEffect(() => {

        const fetchAds = async () => {

            try {

                const res = await axios.get("http://localhost:8000/ads");

                const formattedAds = res.data.map((ad) => ({
                    img: `http://localhost:8000/${ad.image}`,
                    title: ad.title,
                    desc: ad.description,
                    cta: ad.cta,
                    link: ad.link
                }));

                setSponsoredAds(formattedAds);

            } catch (err) {
                console.error("Ads load error", err);
            }

        };

        fetchAds();

    }, []);
    /* ================= Filter DATA ================= */

    const domains = [
        ...new Set(experts.map((e) => e.domain).filter(Boolean))
    ].map((d) => ({
        label: d,
        value: d.toLowerCase()
    }));

    const subdomains = [
        ...new Set(
            experts.flatMap((e) => e.subDomain || []).filter(Boolean)
        )
    ].map((s) => ({
        label: s,
        value: s.toLowerCase()
    }));

    const languages = [
        ...new Set(
            experts.flatMap((e) => e.languages || []).filter(Boolean)
        )
    ].map((l) => ({
        label: l,
        value: l.toLowerCase()
    }));

    const modes = [
        ...new Set(experts.map((e) => e.mode).filter(Boolean))
    ].map((m) => ({
        label: m,
        value: m.toLowerCase()
    }));
    /* ================= EXPERT DATA ================= */

    const [adIndex, setAdIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAdIndex((prev) => (prev + 1) % sponsoredAds.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [sponsoredAds.length]);


    const highRatedExperts = experts.filter(
        (e) => (ratings[e.expertId] || 0) >= 4.5
    );
    const verticalCarouselData = [...highRatedExperts, ...highRatedExperts];

    /* ================= FILTER LOGIC ================= */
    const filteredExperts = experts.filter((e) => {
        return (
            (filters.domain.length === 0 ||
                filters.domain.includes(e.domain?.toLowerCase())) &&

            (filters.subdomain.length === 0 ||
                (e.subDomain || []).some((s) =>
                    filters.subdomain.includes(s.toLowerCase())
                )) &&

            (filters.mode.length === 0 ||
                filters.mode.includes(e.mode?.toLowerCase())) &&

            (filters.language.length === 0 ||
                (e.languages || []).some((l) =>
                    filters.language.includes(l.toLowerCase())
                ))
        );
    });

    const expertsToShow = selectedExpert ? [selectedExpert] : filteredExperts;

    /* ================= DETAILS DASHBOARD ================= */
    if (view === "DASHBOARD" && selectedExpert) {
        return (
            <Box sx={{ p: 4, bgcolor: "#f4fbf3", minHeight: "100vh" }}>
                <Grid container spacing={3}>
                    {/* ================= LEFT : EXPERT DETAILS ================= */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, height: "100%" }}>
                            <Button
                                variant="contained"
                                sx={{ mb: 2, bgcolor: "#2e7d32" }}
                                onClick={() => {
                                    setView("LIST");
                                    setSelectedExpert(null);
                                }}
                            >
                                ← Back to All Experts
                            </Button>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={4}
                                alignItems="center"
                            >
                                <Avatar
                                    src={selectedExpert.image}
                                    sx={{
                                        width: 160,
                                        height: 160,
                                        border: "4px solid #2e7d32",
                                    }}
                                />
                                <Box>
                                    <Typography variant="h4" color="#2e7d32">
                                        {selectedExpert.name}
                                    </Typography>
                                    <Typography fontWeight="bold" color="success.main">
                                        {selectedExpert.expertise}
                                    </Typography>
                                    <Typography mt={1}>
                                        <b>Mode:</b> {selectedExpert.mode}
                                    </Typography>
                                     <Rating
                                    value={ratings[selectedExpert.expertId] || 4.5}
                                    precision={0.1}
                                    size="small"
                                    readOnly
                                />
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4}>
                                    <StatCard title="Experience" value={`${selectedExpert.experience}+ Years`} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <StatCard title="Sessions" value={`${selectedExpert.session}+`} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <StatCard title="Rate" value={`₹${selectedExpert.rate}/hr`} />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" fontWeight="bold">
                                About Expert
                            </Typography>
                            <Typography color="text.secondary" mt={1}>
                                {selectedExpert.about}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" fontWeight="bold">
                                What You Get
                            </Typography>
                            <Typography>✅ Personalized learning plan</Typography>
                            <Typography>✅ Practical project-based training</Typography>
                            <Typography>✅ Doubt clearing sessions</Typography>
                            <Typography>✅ Resume & Interview guidance</Typography>

                            <Divider sx={{ my: 2 }} />

                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" sx={{ bgcolor: "#2e7d32" }}>
                                    Book Session
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ borderColor: "#2e7d32", color: "#2e7d32" }}
                                >
                                    Chat Now
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* ================= RIGHT : ADS / TOP EXPERTS ================= */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3} sx={{ height: "100%" }}>

                            {/* Sponsored Ads */}
                            <Paper
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: "#ffffff",
                                    borderLeft: "4px solid #2e7d32",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography fontWeight="bold" mb={1} fontSize={14}>
                                    Sponsored
                                </Typography>

                                {/* ===== SLIDESHOW CONTAINER ===== */}
                                <Box
                                    sx={{
                                        width: 260,
                                        maxWidth: "100%",
                                        height: 160,
                                        overflow: "hidden",
                                        position: "relative",
                                        mx: "auto",
                                        borderRadius: 4,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            transform: `translateX(-${adIndex * 100}%)`,
                                            transition: "transform 0.6s ease-in-out",
                                        }}
                                    >
                                        {sponsoredAds.map((ad, i) => (
                                            <Box
                                                key={i}
                                                sx={{
                                                    minWidth: "100%",
                                                    position: "relative",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={ad.img}
                                                    alt={ad.title}
                                                    sx={{
                                                        width: "100%",
                                                        height: 160,
                                                        objectFit: "cover",

                                                    }}
                                                />

                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        p: 1,
                                                        bgcolor: "rgba(0,0,0,0.55)",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <Typography fontSize={13} fontWeight={600} noWrap>
                                                        {ad.title}
                                                    </Typography>
                                                    <Typography fontSize={11} sx={{ opacity: 0.9 }}>
                                                        {ad.desc}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        component="a"
                                                        href={ad.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            mt: 0.4,
                                                            bgcolor: "#2e7d32",
                                                            color: "#fff",
                                                            fontSize: "11px",
                                                            px: 1,
                                                            py: 0.2,
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        {ad.cta}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>


                                <Typography fontSize={9} color="text.disabled" mt={0.5}>
                                    Ads by partner platforms
                                </Typography>
                            </Paper>
                            {/* Top Rated Experts */}
                            <Paper
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    borderLeft: "4px solid #2e7d32",
                                }}
                            >
                                <Typography fontWeight="bold" mb={2}>
                                    Top Rated Experts
                                </Typography>

                                {/* ===== VERTICAL CAROUSEL WRAPPER ===== */}
                                <Box
                                    sx={{
                                        height: 380,                 
                                        overflow: "hidden",
                                        position: "relative",

                                        "&:hover .vertical-track": {
                                            animationPlayState: "paused",
                                        },
                                    }}
                                >
                                    {/* ===== VERTICAL CAROUSEL TRACK ===== */}
                                    <Box
                                        className="vertical-track"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                            animation: "vertical-scroll 30s linear infinite",

                                            "@keyframes vertical-scroll": {
                                                "0%": { transform: "translateY(0)" },
                                                "100%": { transform: "translateY(-50%)" },
                                            },
                                        }}
                                    >
                                        {verticalCarouselData.map((e, i) => (
                                            <Stack
                                                key={i}
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                                sx={{
                                                    cursor: "pointer",
                                                    "&:hover": { opacity: 0.85 },
                                                }}
                                                onClick={() => {
                                                    setSelectedExpert({
                                                        ...e,
                                                        image: e.img,
                                                        expertise: e.skill,
                                                        mode: e.mode
                                                    });
                                                }}
                                            >
                                                <Avatar src={e.img} />
                                                <Box>
                                                    <Typography fontSize={14} fontWeight={600}>
                                                        {e.name}
                                                    </Typography>
                                                    <Typography fontSize={12} color="text.secondary">
                                                        {e.skill}
                                                    </Typography>
                                                    <Rating
                                                        value={ratings[e.expertId] || 4.5}
                                                        precision={0.1}
                                                        size="small"
                                                        readOnly
                                                    />
                                                </Box>
                                            </Stack>
                                        ))}
                                    </Box>
                                </Box>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    /* ================= MAIN LIST UI ================= */
    return (
        <Box
            sx={{
                bgcolor: "#f6f8fb",
                minHeight: "100vh",
                fontFamily: `"Inter","Segoe UI",sans-serif`,
            }}
        >
            {/* ===== FEATURED SECTION ===== */}
            <Box
                sx={{
                    px: "60px",
                    py: "30px",
                    background: "linear-gradient(#1a3d35)",
                    color: "white",
                }}
            >
                <Typography fontWeight={600} mb={2}>
                    <LaptopMacIcon sx={{ mr: 1 }} />
                    Top Rated Industry Experts
                </Typography>

                {/* ===== CAROUSEL WRAPPER ===== */}
                <Box
                    sx={{
                        overflow: "hidden",
                        width: "100%",
                        position: "relative",
                        "&:hover .carousel-track": {
                            animationPlayState: "paused",
                        },
                    }}
                >
                    {/* ===== CAROUSEL TRACK ===== */}
                    <Box
                        className="carousel-track"
                        sx={{
                            display: "flex",
                            gap: "16px",
                            width: "max-content",
                            animation: "smooth-scroll 75s linear infinite",

                            "@keyframes smooth-scroll": {
                                "0%": { transform: "translateX(0)" },
                                "100%": { transform: "translateX(-50%)" },
                            },
                        }}
                    >
                        {[...highRatedExperts, ...highRatedExperts].map((e, i) => (

                            <Paper
                                key={i}
                                sx={{
                                    background: "#fff",
                                    color: "#333",
                                    minWidth: "230px",
                                    p: "14px",
                                    borderRadius: "14px",
                                    display: "flex",
                                    gap: "12px",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",

                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                                    },
                                }}
                                onClick={() => setSelectedExpert(e)}
                            >

                                <Avatar src={e.img} sx={{ width: 56, height: 56 }} />
                                <Box className="featured-text">
                                    <Typography fontSize={14} fontWeight={600}>
                                        {e.name}
                                    </Typography>
                                    <Typography fontSize={12} color="#555">
                                        {e.skill}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            </Box>



            {/* ===== MAIN CONTENT ===== */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "260px 1fr",
                    gap: "24px",
                    px: "60px",
                    py: "30px",
                }}
            >
                {/* ===== LEFT : FILTERS ===== */}
                <Grid item xs={12} md={4}>

                    <Paper
                        sx={{
                            gridColumn: "1 / 2",
                            p: 2,
                            borderRadius: "16px",
                            height: "fit-content",
                        }}
                    >
                        <Typography
                            fontSize={18}
                            fontWeight={600}
                            color="#2e7d32"
                            mb={2}
                        >
                            <TuneIcon sx={{ mr: 1 }} />
                            Filters
                        </Typography>

                        {[
                            { label: "Domain", options: domains, key: "domain" },
                            { label: "Subdomain", options: subdomains, key: "subdomain" },
                            { label: "Mode", options: modes, key: "mode" },
                            { label: "Language", options: languages, key: "language" },
                        ].map(({ label, options, key }) => (
                            <Autocomplete
                                key={key}
                                multiple
                                options={options}
                                getOptionLabel={(o) => o.label}
                                onChange={(e, v) =>
                                    setFilters((p) => ({
                                        ...p,
                                        [key]: v.map((i) => i.value),
                                    }))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label={label} sx={{ mb: "14px" }} />
                                )}
                            />
                        ))}
                    </Paper>
                    <Paper
                        sx={{
                            mt: 5,
                            p: 1.5,
                            borderRadius: 3,
                            bgcolor: "#ffffff",
                            borderLeft: "4px solid #2e7d32",
                            overflow: "hidden",
                        }}
                    >
                        <Typography fontWeight="bold" mb={1} fontSize={14}>
                            Sponsored
                        </Typography>

                        {/* ===== SLIDESHOW CONTAINER ===== */}
                        <Box
                            sx={{
                                width: 260,
                                maxWidth: "100%",
                                height: 140,
                                overflow: "hidden",
                                position: "relative",
                                mx: "auto",
                                borderRadius: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    transform: `translateX(-${adIndex * 100}%)`,
                                    transition: "transform 0.6s ease-in-out",
                                }}
                            >
                                {sponsoredAds.map((ad, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            minWidth: "100%",
                                            position: "relative",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={ad.img}
                                            alt={ad.title}
                                            sx={{
                                                width: "100%",
                                                height: 140,
                                                objectFit: "cover",

                                            }}
                                        />

                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                p: 1,
                                                bgcolor: "rgba(0,0,0,0.55)",
                                                color: "#fff",
                                            }}
                                        >
                                            <Typography fontSize={13} fontWeight={600} noWrap>
                                                {ad.title}
                                            </Typography>
                                            <Typography fontSize={11} sx={{ opacity: 0.9 }}>
                                                {ad.desc}
                                            </Typography>
                                            <Button
                                                size="small"
                                                component="a"
                                                href={ad.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    mt: 0.4,
                                                    bgcolor: "#2e7d32",
                                                    color: "#fff",
                                                    fontSize: "11px",
                                                    px: 1,
                                                    py: 0.2,
                                                    textTransform: "none",
                                                }}
                                            >
                                                {ad.cta}
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>


                        <Typography fontSize={9} color="text.disabled" mt={0.5}>
                            Ads by partner platforms
                        </Typography>
                    </Paper>
                </Grid>
                {/* ===== RIGHT : BACK BUTTON + PROFILES ===== */}
                <Box
                    sx={{
                        gridColumn: "2 / 3",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        minWidth: 0,
                    }}
                >
                    {/* ---- Back Button (ONLY conditional part) ---- */}
                    {(selectedExpert || filteredExperts.length !== experts.length) && (
                        <Button
                            size="small"
                            sx={{
                                alignSelf: "flex-start",
                                bgcolor: "#2e7d32",
                                color: "#fff",
                                fontSize: "13px",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "8px",
                                textTransform: "none",
                                "&:hover": { opacity: 0.9 },
                            }}
                            onClick={() => {
                                setSelectedExpert(null);
                                setFilters({
                                    domain: [],
                                    subdomain: [],
                                    mode: [],
                                    language: [],
                                });
                            }}
                        >
                            ← Back to All Experts
                        </Button>
                    )}

                    {/* ---- Profiles Grid (ALWAYS rendered) ---- */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: selectedExpert
                                ? "repeat(auto-fill, minmax(260px, 260px))"
                                : "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: "22px",
                        }}
                    >
                        {expertsToShow.map((e, i) => (
                            <Paper
                                key={i}
                                sx={{
                                    p: "20px",
                                    borderRadius: "16px",
                                    textAlign: "center",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                                    transition: ".3s",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 16px 35px rgba(0,0,0,.15)",
                                    },
                                }}
                            >
                                <Avatar
                                    src={e.img}
                                    sx={{ width: 90, height: 90, mx: "auto", mb: 1 }}
                                />
                                <Typography fontWeight={600}>{e.name}</Typography>
                                <Typography fontSize={14} color="#666">
                                    {e.skill}
                                </Typography>
                                <Rating
                                    value={ratings[e.expertId] || 4.5}
                                    precision={0.1}
                                    size="small"
                                    readOnly
                                />

                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button sx={{ flex: 1, bgcolor: "#32bb5b", color: "#fff" }}>
                                        Book
                                    </Button>
                                    <Button
                                        sx={{ flex: 1, bgcolor: "#2e7d32", color: "#fff" }}
                                        onClick={() => {
                                            setSelectedExpert({
                                                ...e,
                                                image: e.img,
                                                expertise: e.skill,
                                                mode: e.mode
                                            });
                                            setView("DASHBOARD");
                                        }}
                                    >
                                        Details
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Test;
