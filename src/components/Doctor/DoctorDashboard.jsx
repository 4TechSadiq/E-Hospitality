import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Appointments from './Appointments';
import PatientModule from './PatientModule';
import PrescriptionTable from './PrescriptionTable';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Prescription',
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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

export default function DoctorDashboard(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Get the current page from the router
  const currentPage = router.pathname;

  // Demo window handling
  const demoWindow = window ? window() : undefined;

  // Render the correct component based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case '/dashboard':
        return (
          <>
            <Grid container spacing={1}>
              <Grid size={5} />
              <Grid size={12}>
                <Appointments />
              </Grid>
              <Grid size={12}>
                <PatientModule />
              </Grid>
            </Grid>
          </>
        );
      case '/orders': // Prescription route
        return <PrescriptionTable />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
