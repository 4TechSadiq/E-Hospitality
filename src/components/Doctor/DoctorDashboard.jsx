import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import Appointments from "./Appointments";
import PatientModule from "./PatientModule";
import Histories from "./Histories";
import HistoryIcon from '@mui/icons-material/History';
import FeedIcon from '@mui/icons-material/Feed';
import MedicationIcon from '@mui/icons-material/Medication';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CustomAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Doctor's Portal
        </Typography>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function DoctorDashboard(props) {
  const { doc_id } = useParams(); // Extract docId from URL
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Dynamic navigation array using doc_id
  const NAVIGATION = useMemo(() => [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: `DoctorDashboard/${doc_id}`,
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "orders",
      title: "Histories",
      icon: <HistoryIcon />,
    },
    {
      segment: "orders",
      title: "Add Feed",
      icon: <FeedIcon />,
    },
    {
      segment: "orders",
      title: "New Medicines",
      icon: <MedicationIcon />,
    },
  ], [doc_id]); // Recalculate NAVIGATION whenever doc_id changes

  const handleOpenPatient = (patientId) => {
    setSelectedPatient(patientId);
    navigate(`/DoctorDashboard/${doc_id}/patient/${patientId}`);
  };

  const renderContent = () => {
    const currentPath = window.location.pathname;

    if (currentPath.includes(`/DoctorDashboard/${doc_id}/patient`)) {
      return <PatientModule patientId={selectedPatient} />;
    }

    switch (currentPath) {
      case `/DoctorDashboard/${doc_id}`:
        return (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Typography variant="h5">Status:</Typography>
                  <Typography variant="h5" color="error">
                    Offline
                  </Typography>
                </Box>

                <Appointments docId={doc_id} onOpenPatient={handleOpenPatient} />

                <Container>
                  <Grid container spacing={2} justifyContent="center" className="mt-3">
                    <Grid item xs={3}>
                      <Typography textAlign="center" variant="h6">
                        Go Pause
                      </Typography>
                      <Box display="flex" justifyContent="center">
                        <Button style={{ background: "#DE3163" }} variant="contained">
                          Pause
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography textAlign="center" variant="h6">
                        Go Offline
                      </Typography>
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained">Offline</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </>
        );

      case `/DoctorDashboard/${doc_id}/orders`:
        return <Histories />;

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout appBar={<CustomAppBar />}>
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
