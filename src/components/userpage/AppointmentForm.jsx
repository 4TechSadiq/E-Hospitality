import React, { useState, useEffect } from 'react';
import { Button, Container, Grid2, TextField, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe and axios defaults
const stripePromise = loadStripe('pk_test_51Pm9dW09RSNCkCeLWAesCmdAteNtE48mUXSJWTa2BF2l9JNoW45VKHFOn6b0a5716ode7LcOwvyYpXxPXdbZSQHf00Fqviu3nY');
axios.defaults.headers.common['Content-Type'] = 'application/json';

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stripePromise) {
      console.error('Stripe has not been properly initialized');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Payment form submitted');
    
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      console.error('Stripe not initialized:', { stripe, elements });
      setError("Stripe is not initialized");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('Card element not found');
      setError("Card element not found");
      setLoading(false);
      return;
    }

    try {
      console.log('Creating payment intent...');
      const intentResponse = await axios.post('http://127.0.0.1:8000/create-payment-intent/', {
        amount: amount * 100
      });

      console.log('Payment intent response:', intentResponse);

      if (!intentResponse.data.clientSecret) {
        throw new Error("No client secret received");
      }

      console.log('Confirming card payment...');
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        intentResponse.data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          }
        }
      );

      console.log('Payment confirmation result:', { stripeError, paymentIntent });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded');
        onSuccess(paymentIntent.id);
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Payment Error:', err);
      setError(err.message);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
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
        <Typography color="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button 
        type="submit" 
        variant="contained" 
        disabled={!stripe || loading}
        fullWidth
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </Button>
    </form>
  );
};

function AppointmentForm({ doc_id, user_id }) {
  const APPOINTMENT_COST = 50;
  const [activeStep, setActiveStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    mid_name: '',
    last_name: '',
    phone: '',
    email: '',
    disease: '',
    description: '',
    doc_id: '',
    user_id: '',
  });

  useEffect(() => {
    if (doc_id) {
      setFormData((prev) => ({ ...prev, doc_id }));
    }
  }, [doc_id]);

  useEffect(() => {
    if (user_id) {
      setFormData((prev) => ({ ...prev, user_id }));
    }
  }, [user_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    console.log('Payment succeeded, processing appointment...');
    setPaymentStatus('success');
    setPaymentError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/pay-appointment/', {
        ...formData,
        payment_intent_id: paymentIntentId,
        payment_status: 'completed',
        doc_id: doc_id,
        user_id: user_id,
        date: new Date().toISOString().split('T')[0]
      });
      
      console.log('Appointment creation response:', response);
      
      if (response.data) {
        setActiveStep(2);
        alert('Appointment booked successfully!');
      } else {
        throw new Error('Failed to create appointment');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setPaymentError('Failed to submit appointment. Please try again.');
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    setPaymentStatus('failed');
    setPaymentError(error);
  };

  const handleNext = () => {
    if (activeStep === 0 && !isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setPaymentError(null);
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      mid_name: '',
      last_name: '',
      phone: '',
      email: '',
      disease: '',
      description: '',
      doc_id: '',
      user_id: '',
    });
    setActiveStep(0);
    setPaymentStatus(null);
    setPaymentError(null);
  };

  const isFormValid = () => {
    const requiredFields = ['first_name', 'last_name', 'phone', 'email'];
    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const steps = ['Appointment Details', 'Payment', 'Confirmation'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                required
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                label="Middle Name"
                name="mid_name"
                value={formData.mid_name}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                required
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={9}>
              <TextField
                fullWidth
                required
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                label="Disease"
                name="disease"
                value={formData.disease}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Disease Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid2>
          </Grid2>
        );

      case 1:
        return (
          <Box sx={{ maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Elements stripe={stripePromise} options={{ locale: 'en' }}>
              <PaymentForm 
                amount={APPOINTMENT_COST}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
            {paymentError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {paymentError}
              </Typography>
            )}
          </Box>
        );

      case 2:
        return (
          <Typography variant="h6" align="center">
            Your appointment has been booked successfully!
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography className="mb-4 mt-4" variant="h4">
        Book Appointment
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{ flexGrow: 1 }}
        padding={2}
        className="p-1"
      >
        {renderStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {activeStep !== 2 && (
            <>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              {activeStep === 0 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isFormValid()}
                >
                  Proceed to Payment
                </Button>
              )}
            </>
          )}
          {activeStep === 2 && (
            <Button
              variant="contained"
              onClick={handleReset}
            >
              Book Another Appointment
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default AppointmentForm;