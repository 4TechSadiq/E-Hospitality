import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  CircularProgress,
  Paper,
  Box,
  Alert
} from '@mui/material';

export default function AddFeed() {
  const { doc_id } = useParams();
  const [formData, setFormData] = useState({
    headline: '',
    news: '',
    image: null,
    doctor: doc_id || '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files?.length > 0) {
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.headline.trim() || !formData.news.trim() || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    if (!doc_id) {
      setError('Doctor ID is missing');
      return;
    }

    const data = new FormData();
    data.append('doctor', doc_id);
    data.append('headline', formData.headline);
    data.append('news', formData.news);
    data.append('image', formData.image);

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/create-med-news', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('News added successfully:', result);
      
      setFormData({
        headline: '',
        news: '',
        image: null,
        doctor: doc_id,
      });
      setImagePreview('');
      
    } catch (err) {
      console.error('Error adding news:', err);
      setError('Failed to add news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ p: 3 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Add News
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                fullWidth
                required
                multiline
              />

              <TextField
                label="News Content"
                name="news"
                value={formData.news}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
              />

              <TextField
                type="file"
                name="image"
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: 'image/*'
                }}
              />

              {imagePreview && (
                <Box sx={{ mt: 2, maxWidth: 300 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ 
                      maxWidth: '100%', 
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}