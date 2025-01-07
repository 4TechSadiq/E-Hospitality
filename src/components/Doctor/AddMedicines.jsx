import React, { useState } from "react";
import { TextField, Button, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";

export default function AddMedicines() {
  const [formData, setFormData] = useState({
    name: "",
    dosage_options: "",
    description: "",
    side_effects: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    axios
      .post("http://127.0.0.1:8000/create-medicine", formData)
      .then((response) => {
        setSuccess("Medicine added successfully!");
        setFormData({ name: "", dosage_options: "", description: "", side_effects: "" });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        setError("Failed to add medicine. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4" gutterBottom>
          Add Medicine
        </Typography>
        {error && (
          <Typography color="error" style={{ marginBottom: "20px" }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" style={{ marginBottom: "20px" }}>
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Dosage Options"
            name="dosage_options"
            value={formData.dosage_options}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            helperText="Enter dosage options separated by commas (e.g., 50mg, 100mg, 200mg)"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Side Effects"
            name="side_effects"
            value={formData.side_effects}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
