import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function Availability() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Availability & Sessions
      </Typography>

      <Card>
        <CardContent>
          <Typography>Office Hours: Monday – Friday</Typography>
          <Typography>Time: 10:00 AM – 5:00 PM</Typography>
          <Typography mt={1}>Next Session: 24 Jan 2026</Typography>

          <Button variant="contained" sx={{ mt: 2 }}>
            Manage Schedule
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
