import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Barchart from "./Barchart"; // Assuming you have this component
import History from "./History"; // Assuming you have this component
import PrescriptionModal from "./PrescriptionModal"; // Assuming you have this component
import PatientHistory from "./PatientHistory";


export default function PatientModule() {
  const { doc_id } = useParams();
  const { patientId } = useParams(); // Get patientId from the URL
  const [patientDetails, setPatientDetails] = useState(null); // State to store patient details
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true); // State to handle loading
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State for filtered appointment

  // Fetch patient details
  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/list-user");
      const user = response.data.find((u) => u.id === parseInt(patientId));

      if (user) {
        setPatientDetails(user);
      } else {
        console.error("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/list-appointment");
      const filteredAppointments = response.data.filter(
        (appointment) => appointment.user_id === patientId
      );

      setAppointments(filteredAppointments);

      if (filteredAppointments.length > 0) {
        setSelectedAppointment(filteredAppointments[0]); // Select the first appointment
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchAppointments();
  }, [patientId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Details
      </Typography>

      {loading ? (
        <Typography variant="h6">Loading patient details...</Typography>
      ) : patientDetails ? (
        <Box
          sx={{
            width: "100%",
            height: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "30px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img
                src={patientDetails.profile}
                alt="Patient"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  border: "solid 1px black",
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" gutterBottom>
                Name: {patientDetails.first_name} {patientDetails.last_name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Gender: {patientDetails.gender}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {patientDetails.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Phone: {patientDetails.phone}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Address: {patientDetails.address}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h6">Patient not found</Typography>
      )}

      {/* Disease Section */}
      <Container className="mt-4">
        <Typography variant="h5">Disease</Typography>
        {selectedAppointment ? (
          <Box
            sx={{
              width: "40%",
              minHeight: "50px",
              maxHeight: "fit-content",
              borderRadius: "10px",
              boxShadow: "0 1px 1px #ccc",
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              ":hover": {
                backgroundColor: "#ccc",
                width: "42%",
                transition: "0.5s",
              },
            }}
          >
            <Typography variant="subtitle1">
              Disease Name: {selectedAppointment.disease}
            </Typography>
            <Typography variant="subtitle1">
              Description: {selectedAppointment.description}
            </Typography>
            
          </Box>
          
        ) : (
          <Typography variant="subtitle1">No appointment found</Typography>
        )}
      </Container>

      {/* Health Index Section */}
      {/* <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography className="mt-3" variant="h5">
              Health Index
            </Typography>
            <Barchart />
          </Grid>
          <Grid item xs={6}>
            <Typography className="mt-3" variant="h5">
              Health Index
            </Typography>
            <Barchart />
          </Grid>
        </Grid>
      </Container> */}

      {/* Medical History Section */}
      <Container className="mt-4">
        <PatientHistory />
      </Container>

      {/* Prescription Table Section */}
      <Container className="mt-4">
        <Typography variant="h5" className="mb-3">
          Prescription Table
        </Typography>
        <PrescriptionModal patientId={patientId} doc_id={doc_id}/>
      </Container>
    </Container>
  );
}
