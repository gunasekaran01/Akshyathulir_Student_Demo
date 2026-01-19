import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Revenue() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Revenue
      </Typography>

      <Card>
        <CardContent>
          <Typography>Total Sessions: 28</Typography>
          <Typography>Earnings This Month: ₹18,000</Typography>
          <Typography>Total Earnings: ₹2,10,000</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
