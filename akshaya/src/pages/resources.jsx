import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  TextField,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";

/* ------------------ COLORS ------------------ */
const COLORS = {
  dark: "#1B5E20",
  main: "#2E7D32",
  light: "#E8F5E9",
  mint: "#66BB6A",
  warning: "#FB8C00",
  danger: "#E53935",
};

/* ------------------ KPI DATA ------------------ */
const resourceKpis = [
  { label: "Total Resources", value: 42, icon: <FolderIcon /> },
  { label: "Documents", value: 18, icon: <DescriptionIcon /> },
  { label: "Videos", value: 9, icon: <VideoLibraryIcon /> },
  { label: "Downloads", value: 320, icon: <CloudDownloadIcon /> },
  { label: "Free Resources", value: 36, icon: <CheckCircleIcon /> },
  { label: "Assigned Startups", value: 12, icon: <GroupsIcon /> },
];

/* ------------------ RESOURCE DATA ------------------ */
const resources = [
  {
    title: "Investor Pitch Deck Template",
    type: "Document",
    sharedWith: "AgroTech AI",
    downloads: 48,
  },
  {
    title: "Startup Financial Model (Excel)",
    type: "Document",
    sharedWith: "FinSmart",
    downloads: 62,
  },
  {
    title: "Go-To-Market Strategy Guide",
    type: "Document",
    sharedWith: "HealthPulse",
    downloads: 35,
  },
  {
    title: "Product-Market Fit Masterclass",
    type: "Video",
    sharedWith: "All Startups",
    downloads: 120,
  },
  {
    title: "Legal & Compliance Checklist",
    type: "Document",
    sharedWith: "GreenLogix",
    downloads: 29,
  },
  {
    title: "Product-Market Fit Masterclass",
    type: "Video",
    sharedWith: "All Startups",
    downloads: 120,
  },
  {
    title: "Legal & Compliance Checklist",
    type: "Document",
    sharedWith: "GreenLogix",
    downloads: 33,
  },
  {
    title: "SaaS Growth Strategy Resource",
    type: "Link",
    sharedWith: "HealthPulse",
    downloads: 57,
  },
];
/* ------------------ COMPONENT ------------------ */
export default function ExpertResources() {
  /* ---------- STATE ---------- */
  const [resourceForm, setResourceForm] = React.useState({
    title: "",
    type: "PDF",
    description: "",
    pricing: "FREE",
    price: "",
    discount: "",
  });

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploadedResources, setUploadedResources] = React.useState([]);

  /* ---------- HANDLERS ---------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResourceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!resourceForm.title || !selectedFile) {
      alert("Please enter title and select a file");
      return;
    }

    if (
      resourceForm.pricing === "PAID" &&
      !resourceForm.price
    ) {
      alert("Please enter price for paid resource");
      return;
    }

    const price = Number(resourceForm.price || 0);
    const discount = Number(resourceForm.discount || 0);
    const finalPrice =
      resourceForm.pricing === "PAID"
        ? price - (price * discount) / 100
        : 0;

    const newResource = {
      id: Date.now(),
      title: resourceForm.title,
      type: resourceForm.type,
      description: resourceForm.description,
      pricing: resourceForm.pricing,
      price,
      discount,
      finalPrice,
      fileName: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      uploadedAt: new Date().toLocaleString(),
      fileURL: URL.createObjectURL(selectedFile),
    };

    setUploadedResources((prev) => [...prev, newResource]);

    // reset
    setResourceForm({
      title: "",
      type: "PDF",
      description: "",
      pricing: "FREE",
      price: "",
      discount: "",
    });
    setSelectedFile(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>

      {/* 📁 HEADER */}
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
          Expert Resources
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          Manage and share valuable resources with startups
        </Typography>
      </Box>

      {/* 📊 KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {resourceKpis.map((k, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                },
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: COLORS.light, color: COLORS.main }}>
                    {k.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {k.label}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold"
                      sx={{ color: COLORS.main }}>
                      {k.value}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📁 RESOURCE CARDS */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Shared Resources
      </Typography>
      <Grid container spacing={3} mb={4}>
        {resources.map((r, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                height: 180,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Typography fontWeight="bold">{r.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  Shared with: {r.sharedWith}
                </Typography>

                <Stack direction="row" spacing={1} mt={2}>
                  <Chip label={r.type} color="success" size="small" />
                  <Chip
                    label={`${r.downloads} downloads`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📤 Add new RESOURCE */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Add New Resource
      </Typography>
      <Card sx={{ borderRadius: 4, mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>

            {/* Title */}
            <Grid item xs={12} md={6} display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Resource Title"
                name="title"
                value={resourceForm.title}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Type */}
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <TextField
                fullWidth
                select
                label="Resource Type"
                name="type"
                value={resourceForm.type}
                onChange={handleInputChange}
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="Video">Video</MenuItem>
                <MenuItem value="Image">Image</MenuItem>
              </TextField>
            </Grid>

            {/* Description */}
            <Grid item xs={12} display="flex" alignItems="center">
              <TextField
                fullWidth
                multiline
                rows={1}
                label="Description"
                name="description"
                value={resourceForm.description}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Pricing */}
            <Grid item xs={12} display="flex" alignItems="center">
              <TextField
                fullWidth
                select
                label="Resource Access"
                name="pricing"
                value={resourceForm.pricing}
                onChange={handleInputChange}
              >
                <MenuItem value="FREE">Free</MenuItem>
                <MenuItem value="PAID">Paid</MenuItem>
              </TextField>
            </Grid>

            {/* Price (only if Paid) */}
            {resourceForm.pricing === "PAID" && (
              <>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="number"
                    name="price"
                    value={resourceForm.price}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Discount (%)"
                    type="number"
                    name="discount"
                    value={resourceForm.discount}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* File Upload */}
          <Grid item xs={12} mt={2}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: "2px dashed #A5D6A7",
                p: 3,
                background: "#F1F8E9",
                transition: "0.3s",
                "&:hover": {
                  background: "#E8F5E9",
                  borderColor: COLORS.main,
                },
              }}
            >
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Typography fontWeight="bold">
                  {selectedFile ? selectedFile.name : "Upload Resource File"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Supported formats: PDF, Image, Video • Max size 50MB
                </Typography>

                <input
                  type="file"
                  accept=".pdf,image/*,video/*"
                  hidden
                  id="upload-file"
                  onChange={handleFileChange}
                />

                <label htmlFor="upload-file">
                  <Chip
                    icon={<CloudUploadIcon />}
                    label="Select File"
                    clickable
                    color="success"
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontWeight: "bold",
                    }}
                  />
                </label>

                {selectedFile && (
                  <>

                    <Chip
                      label="Upload Resource"
                      color="success"
                      onClick={handleUpload}
                      sx={{ px: 4, py: 2, fontSize: "1rem" }}
                    />
                  </>

                )}

              </Stack>
            </Card>
          </Grid>
        </CardContent>
      </Card>
      {/* 📤 UPLOAD RESOURCE */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Uploaded Resources
      </Typography>

      <Grid container spacing={3}>
        {uploadedResources.map((r) => (
          <Grid item xs={12} md={4} key={r.id}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Typography fontWeight="bold">{r.title}</Typography>
                  <Chip
                    label={r.pricing === "FREE" ? "Free" : "Paid"}
                    color={r.pricing === "FREE" ? "success" : "warning"}
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {r.fileName} • {r.size}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>


                  {r.pricing === "PAID" && (
                    <Box mt={1}>
                      <Typography
                        variant="caption"
                        sx={{ color: "success.main", fontWeight: "bold" }}
                      >
                        Special price
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* Final Price */}
                        <Typography variant="h6" fontWeight="bold">
                          ₹{r.finalPrice}
                        </Typography>

                        {/* Original Price */}
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ₹{r.price}
                        </Typography>

                        {/* Discount */}
                        <Typography
                          variant="body2"
                          sx={{ color: "success.main", fontWeight: "bold" }}
                        >
                          {r.discount}% off
                        </Typography>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        One-time access • No hidden charges
                      </Typography>
                    </Box>
                  )}

                </Stack>
                <Stack direction="row" spacing={1} mt={2}>
                  <Chip
                    label="View"
                    color="primary"
                    onClick={() => window.open(r.fileURL, "_blank")}
                  />
                  <Chip
                    label="Delete"
                    color="error"
                    onClick={() =>
                      setUploadedResources((prev) =>
                        prev.filter((item) => item.id !== r.id)
                      )
                    }
                  />
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Uploaded at: {r.uploadedAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* 📋 RESOURCE ALLOCATION */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Resource Allocation
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{
            background: COLORS.main, "& .MuiTableCell-head": {
              color: "#fff",
              fontWeight: "bold",
            },
          }}>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Shared With</TableCell>
              <TableCell>Downloads</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.sharedWith}</TableCell>
                <TableCell>{r.downloads}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
