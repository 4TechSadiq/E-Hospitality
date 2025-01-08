import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from "./Slider";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Consult() {
  const { userId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/create-doctor');
        const doctorsData = Array.isArray(response.data) ? response.data : [response.data];
        
        // Log the initial data count
        console.log('Total doctors received:', doctorsData.length);
        
        // Instead of deduplicating by doc_id, use id which is unique
        const uniqueDoctors = doctorsData;
        
        console.log('Doctors after processing:', uniqueDoctors.length);
        
        setDoctors(uniqueDoctors);
        setFilteredDoctors(uniqueDoctors);

        // Create search options from unique values
        const categories = [...new Set(uniqueDoctors.map(doc => doc.category))];
        const doctorNames = [...new Set(uniqueDoctors.map(doc => doc.doc_name))];
        
        const options = [
          ...categories.map(cat => ({ type: 'category', label: cat })),
          ...doctorNames.map(name => ({ type: 'doctor', label: name }))
        ];
        
        setSearchOptions(options);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setError('Failed to load doctor data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  const handleSearchChange = (event, value) => {
    setSearchValue(value);

    // If search is cleared, reset to all doctors
    if (!value || value === '') {
      setFilteredDoctors(doctors);
      return;
    }

    const searchTerm = value?.label || value || '';
    const lowercasedValue = searchTerm.toLowerCase();

    const filtered = doctors.filter(doc => 
      doc.doc_name.toLowerCase().includes(lowercasedValue) ||
      doc.category.toLowerCase().includes(lowercasedValue)
    );

    console.log('Filtered doctors count:', filtered.length);
    setFilteredDoctors(filtered);
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading doctors...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Container className="mt-4">
        <Typography variant="h3" className="mb-4">Consult Doctor</Typography>
        <Container className="d-flex mt-4 justify-content-start">
          <Autocomplete
            disablePortal
            freeSolo
            options={searchOptions}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              return option?.label || '';
            }}
            sx={{ width: '50%' }}
            value={searchValue}
            onInputChange={handleSearchChange}
            renderOption={(props, option) => (
              <li {...props}>
                {option.type === 'category' ? '🏥 ' : '👨‍⚕️ '}
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Search Category or Doctor" 
                variant="outlined"
              />
            )}
          />
        </Container>
      </Container>
      
      <Container className="d-flex justify-content-evenly mt-4 mb-5 flex-wrap">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Slider
              key={`${doctor.id}-${doctor.doc_id}`} // Using composite key for better uniqueness
              doctor={{
                doc_id: doctor.doc_id,
                doc_name: doctor.doc_name,
                category: doctor.category,
                hospital: doctor.hospital,
                experience: doctor.experiance,
                image: doctor.profile || null, // Changed from image to profile based on your data
                price: doctor.price, // Added price from your data
              }}
              user_id={userId}
            />
          ))
        ) : (
          <Typography variant="h6" className="mt-4">
            No doctors found matching your search criteria.
          </Typography>
        )}
      </Container>
    </Container>
  );
}