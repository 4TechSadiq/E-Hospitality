import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = ({ appointmentData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // 1. Create payment intent on backend
      const response = await fetch('http://your-django-api/create-payment-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: appointmentData.price * 100, // Convert to cents
          currency: 'usd',
        }),
      });

      const { clientSecret } = await response.json();

      // 2. Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: appointmentData.name,
            email: appointmentData.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // 3. Submit appointment data to backend
        const appointmentResponse = await fetch('http://your-django-api/appointments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...appointmentData,
            payment_intent_id: result.paymentIntent.id,
            payment_status: 'pending',
          }),
        });

        if (appointmentResponse.ok) {
          onSuccess();
        } else {
          setError('Failed to save appointment');
        }
      }
    } catch (err) {
      setError('An error occurred while processing payment');
    }

    setLoading(false);
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
        disabled={!stripe || loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          `Pay ${appointmentData.price} USD`
        )}
      </Button>
    </form>
  );
};

const AppointmentPaymentForm = ({ appointmentData, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        appointmentData={appointmentData}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default AppointmentPaymentForm;