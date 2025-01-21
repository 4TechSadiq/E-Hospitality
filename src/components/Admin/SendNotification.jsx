import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  CircularProgress,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const SendNotification = () => {
  const [medConditions, setMedConditions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medResponse, notifResponse, userResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/list-med-condition'),
          fetch('http://127.0.0.1:8000/list-notification/'),
          fetch('http://127.0.0.1:8000/list-user')
        ]);

        const medData = await medResponse.json();
        const notifData = await notifResponse.json();
        const userData = await userResponse.json();

        setMedConditions(medData);
        setNotifications(notifData);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSnackbar({
          open: true,
          message: 'Error fetching data',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserData = (userId) => {
    return users.find(u => u.id === parseInt(userId)) || null;
  };

  const getNotificationData = (prescriptionId) => {
    return notifications.find(n => n.prescription === prescriptionId) || null;
  };

  const handleSendNotification = async (medCondition) => {
    try {
      const userData = getUserData(medCondition.user);
      const notificationData = getNotificationData(medCondition.id);

      // Prepare comprehensive payload with all data
      const payload = {
        // Medical condition data
        medicalCondition: {
          id: medCondition.id,
          condition: medCondition.condition,
          severity: medCondition.severity,
          medication: medCondition.medication,
          doctor: medCondition.doctor,
          status: medCondition.status
        },
        // User data
        userData: userData ? {
          userId: userData.user_id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          gender: userData.gender,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          profile: userData.profile
        } : null,
        // Notification data
        notificationData: notificationData ? {
          id: notificationData.id,
          createdAt: notificationData.created_at,
          updatedAt: notificationData.updated_at,
          price: notificationData.price,
          status: notificationData.status,
          paymentId: notificationData.payment_id,
          prescription: notificationData.prescription
        } : null,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('http://127.0.0.1:8000/recieve-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Notification sent successfully',
          severity: 'success'
        });
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send notification',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medConditions.map((condition) => {
              const userData = getUserData(condition.user);
              return (
                <TableRow key={condition.id}>
                  <TableCell>{userData?.user_id || condition.user}</TableCell>
                  <TableCell>{userData ? `${userData.first_name} ${userData.last_name}` : 'N/A'}</TableCell>
                  <TableCell>{userData?.email || 'N/A'}</TableCell>
                  <TableCell>{condition.condition}</TableCell>
                  <TableCell>{condition.severity}</TableCell>
                  <TableCell>{condition.medication}</TableCell>
                  <TableCell>{condition.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSendNotification(condition)}
                    >
                      Send Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SendNotification;