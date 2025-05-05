// src/components/common/BackButton.js
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackIcon from "@mui/icons-material/ArrowBack"; // Importing the back icon

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => navigate(-1)} // Navigate back
    >
      <BackIcon />
    </Button>
  );
};

export default BackButton;
