import React, { useState, useEffect } from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
} from '@mui/material';
import { useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Pm9dW09RSNCkCeLWAesCmdAteNtE48mUXSJWTa2BF2l9JNoW45VKHFOn6b0a5716ode7LcOwvyYpXxPXdbZSQHf00Fqviu3nY');

// Payment Form Component
const CheckoutForm = ({ notificationId, amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('CheckoutForm amount:', amount); // Debug log

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !amount) {
      console.error('Missing required parameters:', { stripe, elements, amount });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const createIntentResponse = await fetch('http://127.0.0.1:8000/create-payment-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          notification_id: notificationId,
        }),
      });

      if (!createIntentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await createIntentResponse.json();
      console.log('Client secret received'); // Debug log

      // Confirm the payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentError) {
        console.error('Payment error:', paymentError);
        setError(paymentError.message);
        return;
      }

      // Update notification status
      const updateResponse = await fetch(`http://127.0.0.1:8000/update-notification/${notificationId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'paid',
          payment_id: paymentIntent.id,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update notification status');
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Payment processing error:', err);
      setError(err.message || 'An error occurred while processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        type="submit"
        disabled={!stripe || loading || !amount}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : `Pay $${amount} USD`}
      </Button>
    </form>
  );
};

// Main Notification Component
export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-notification/');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    fetchNotifications();
    alert('Payment processed successfully!');
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handlePaymentClick = (notification) => {
    console.log('Selected notification:', notification); // Debug log
    setSelectedNotification(notification);
    setIsPaymentOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ m: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2 }}>
        Prescription Notifications
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {notifications.map((notification) => (
          <Card key={notification.id} sx={{ minWidth: 300, maxWidth: 400 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Date: {new Date(notification.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="h6">Prescription ID: {notification.prescription}</Typography>
              <Typography variant="body1">Price: ${parseFloat(notification.price).toFixed(2)}</Typography>
              <Chip
                label={notification.status}
                color={getStatusChipColor(notification.status)}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
            {notification.status === 'pending' && (
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlePaymentClick(notification)}
                >
                  Pay Now
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </Box>

      {selectedNotification && (
        <Dialog
          open={isPaymentOpen}
          onClose={() => {
            setIsPaymentOpen(false);
            setSelectedNotification(null);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogContent>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                notificationId={selectedNotification.id}
                amount={parseFloat(selectedNotification.price)}
                onSuccess={handlePaymentSuccess}
                onClose={() => {
                  setIsPaymentOpen(false);
                  setSelectedNotification(null);
                }}
              />
            </Elements>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}