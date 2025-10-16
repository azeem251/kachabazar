// src/pages/OrderSuccess.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
   <div className="bg-slate-50 w-[650px] my-3 mx-auto">
     <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
      
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🎉 Order Placed Successfully!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Thank you for your purchase. Your order has been placed and is being processed.
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/dashboard/orders")}
        >
          View My Orders
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
   </div>
  );
};

export default OrderSuccess;
