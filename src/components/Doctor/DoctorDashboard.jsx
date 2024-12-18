import * as React from "react";
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

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Histories",
    icon: <ShoppingCartIcon />,
  },
];

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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

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
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  const handleOpenPatient = (patientId) => {
    setSelectedPatient(patientId);
    router.navigate(`/dashboard/patient/${patientId}`);
  };

  const renderContent = () => {
    if (router.pathname.startsWith("/dashboard/patient")) {
      return <PatientModule patientId={selectedPatient} />;
    }

    switch (router.pathname) {
      case "/dashboard":
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

                {!selectedPatient ? (
                  <Appointments onOpenPatient={handleOpenPatient} />
                ) : (
                  <PatientModule patientId={selectedPatient} />
                )}

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

      case "/orders":
        return <Histories />;

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout appBar={<CustomAppBar />}> {/* Use Custom Toolbar */}
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}