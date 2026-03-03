import axios from "axios";
import { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
/* ------------------ COLORS ------------------ */
const COLORS = {
  dark: "#1B5E20",
  main: "#2E7D32",
  light: "#E8F5E9",
  mint: "#66BB6A",
  warning: "#FB8C00",
  danger: "#E53935",
  head: "#25544a",
  ehead: "#1f4d3a",
};

/* ------------------ COMPONENT ------------------ */
export default function ExpertResources() {
  const email = localStorage.getItem("expertEmail");
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceForm, setResourceForm] = useState({
    title: "",
    type: "PDF",
    description: "",
    pricing: "FREE",
    price: "",
    discount: "",
    link: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedResources, setUploadedResources] = useState([]);
  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:8000/resource/all/${email}`)
      .then(res => setUploadedResources(res.data))
      .catch(err => console.error(err));
  }, [email]);
  const filteredResources = uploadedResources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

  const handleUpload = async () => {

    if (!resourceForm.title || !resourceForm.description) {
      alert("Please enter title and description");
      return;
    }

    // If not link, file is required
    if (resourceForm.type !== "Link" && !selectedFile) {
      alert("Please select a file");
      return;
    }

    let fileData = {};

    try {

      // Upload file only if not Link
      if (resourceForm.type !== "Link") {

        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await axios.post(
          `http://localhost:8000/resource/upload/${email}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        fileData = uploadRes.data;
      }
      const fileSize = selectedFile
        ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB"
        : null;
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
        uploadedAt: new Date().toISOString().split("T")[0],
         size: fileSize,
        //  If link → store link
        link: resourceForm.type === "Link" ? resourceForm.link : null,

        //  If file → store backend file URL
        fileName: fileData.fileName || null,
        fileURL: fileData.fileURL || null
      };

      const updatedResources = [...uploadedResources, newResource];

      await axios.post(
        `http://localhost:8000/resource/save/${email}`,
        { resources: updatedResources }
      );

      setUploadedResources(updatedResources);

      // 🔥 RESET FORM
      setResourceForm({
        title: "",
        type: "PDF",
        description: "",
        pricing: "FREE",
        price: "",
        discount: "",
        link: ""
      });

      setSelectedFile(null);

    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this resource?"
  );

  if (!isConfirmed) return;

  try {
    await axios.delete(
      `http://localhost:8000/resource/delete/${email}`,
      { params: { resource_id: id } }
    );

    setUploadedResources(prev =>
      prev.filter(r => r.id !== id)
    );

  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
};
const handleDownload = async (r) => {
  try {
    if (r.pricing === "PAID") {
      alert("This is a paid resource. Please purchase to download.");
      return;
    }

    if (!r.fileURL) {
      alert("File not available");
      return;
    }

    const response = await axios.get(
      r.fileURL + "?t=" + new Date().getTime(), // 🔥 Prevent cache
      {
        responseType: "blob",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", r.fileName || "file");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Download error:", error);
    alert("Download failed");
  }
};
  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.light, p: 2 }}>

      {/* 📁 HEADER */}
      <Box
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${COLORS.ehead}, ${COLORS.head})`,
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
        {[
          {
            label: "Total Resources",
            value: uploadedResources.length,
            icon: <FolderIcon />
          },
          {
            label: "Documents",
            value: uploadedResources.filter(r => r.type === "Document").length,
            icon: <DescriptionIcon />
          },
          {
            label: "Videos",
            value: uploadedResources.filter(r => r.type === "Video").length,
            icon: <VideoLibraryIcon />
          },
          {
            label: "PPT",
            value: uploadedResources.filter(r => r.type === "PPT").length,
            icon: <SlideshowIcon />
          },
          {
            label: "Free Resources",
            value: uploadedResources.filter(r => r.pricing === "FREE").length,
            icon: <CheckCircleIcon />
          },
          {
            label: "Paid Resources",
            value: uploadedResources.filter(r => r.pricing === "PAID").length,
            icon: <CurrencyRupeeIcon />
          }
        ].map((k, i) => (
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
                <MenuItem value="PPT">PPT</MenuItem>
                <MenuItem value="Link">Link</MenuItem>
                <MenuItem value="Document">Document</MenuItem>
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

          {/* FILE OR LINK SECTION */}
          {resourceForm.type === "Link" ? (
            <Grid item xs={12} mt={2}>
              <TextField
                fullWidth
                label="Enter Resource URL"
                name="link"
                value={resourceForm.link}
                onChange={handleInputChange}
              />

              <Box mt={2}>
                <Chip
                  label="Upload Resource"
                  color="success"
                  onClick={handleUpload}
                />
              </Box>
            </Grid>
          ) : (
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

                  <input
                    type="file"
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
                    />
                  </label>

                  {selectedFile && (
                    <Chip
                      label="Upload Resource"
                      color="success"
                      onClick={handleUpload}
                    />
                  )}
                </Stack>
              </Card>
            </Grid>
          )}
        </CardContent>
      </Card>
      {/* 📤 UPLOAD RESOURCE */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Uploaded Resources
        </Typography>

        <TextField
          size="small"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 250,
            bgcolor: "#fff",
            borderRadius: 2
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredResources.map((r) => (
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
                {r.type === "Link" ? (
                  <Typography variant="body2" color="text.secondary">
                    Link Resource
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {r.fileName} • {r.size}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  Uploaded at: {r.uploadedAt}
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
                <Stack direction="row" spacing={0.2} mt={2} justifyContent="flex-end">

                  {/* View */}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      if (r.pricing === "PAID") {
                        alert("This is a paid resource. Please purchase to view.");
                        return;
                      }
                      if (r.type === "Link") {
                        window.open(r.link, "_blank");
                      } else {
                        window.open(r.fileURL, "_blank");
                      }
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  {/* Download (only for file types) */}
                  {r.type !== "Link" && (
                    <IconButton
                      color="success"
                      onClick={() => handleDownload(r)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  )}

                  {/* Delete */}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(r.id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                </Stack>
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
            background: COLORS.ehead, "& .MuiTableCell-head": {
              color: "#fff",
              fontWeight: "bold",
            },
          }}>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedResources.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>
                  {r.pricing === "PAID" ? `₹${r.finalPrice}` : "Free"}
                </TableCell>
                <TableCell>{r.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
