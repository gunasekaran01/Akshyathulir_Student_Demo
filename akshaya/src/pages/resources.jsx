import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function Resources() {
  const resources = [
    "Startup Pitch Deck Template",
    "Market Research Guide",
    "Fundraising Checklist",
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Shared Resources
      </Typography>

      {resources.map((r, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{r}</Typography>
          </CardContent>
        </Card>
      ))}

      <Button variant="contained">Upload Resource</Button>
    </Box>
  );
}
