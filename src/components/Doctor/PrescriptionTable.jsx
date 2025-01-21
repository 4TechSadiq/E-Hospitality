import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  Container,
  FormControl,
  CircularProgress,
  InputLabel,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function PrescriptionTable() {
  const [rows, setRows] = React.useState([
    { id: 1, medicine: '', dosage: '', timesPerDay: '', routine: '' },
    { id: 2, medicine: '', dosage: '', timesPerDay: '', routine: '' },
    { id: 3, medicine: '', dosage: '', timesPerDay: '', routine: '' },
  ]);
  const [disease, setDisease] = React.useState('');
  const [remarks, setRemarks] = React.useState('');
  const [outcome, setOutcome] = React.useState('');
  const [medicines, setMedicines] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { patientId, doc_id } = useParams();

  React.useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list-medicine');
      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Failed to load medicines. Please refresh the page.');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Filter out empty rows
      const validRows = rows.filter(row => 
        row.medicine && row.dosage && row.timesPerDay && row.routine
      );
      
      if (validRows.length === 0) {
        alert('Please fill in at least one complete prescription row');
        setLoading(false);
        return;
      }

      // Prepare prescription data
      const prescriptionData = {
        patient: patientId,
        medicines: validRows.map(row => {
          const medicine = medicines.find(m => m.name === row.medicine);
          return medicine ? medicine.id : null;
        }).filter(id => id !== null),
        dosage: validRows.map(row => `${row.dosage}`).join(', '),
        times_per_day: parseInt(validRows[0].timesPerDay),
        routine: validRows.map(row => row.routine).join(', ')
      };

      // Create medical condition data
      const medicalConditionData = {
        user: patientId,
        condition: disease,
        severity: 'Moderate',
        medication: validRows
          .map(row => `${row.medicine} (${row.dosage} mg, ${row.routine})`)
          .join(', '),
        doctor: doc_id,
        status: 'Under Treatment',
      };

      // Create treatment history data
      const treatmentHistoryData = {
        user: patientId,
        medical_condition: disease,
        remarks,
        outcome,
      };

      // Create notification data
      const notificationData = {
        prescription: patientId, // Using patientId as prescription reference
        price: Math.floor(Math.random() * (400 - 50 + 1)) + 50, // Random price between 50 and 400
        status: 'pending',
        payment_id: 'gh6vgvh'
      };
      
      console.log(notificationData)
      // Send all requests
      const responses = await Promise.all([
        fetch('http://127.0.0.1:8000/create-med-condition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medicalConditionData)
        }),
        fetch('http://127.0.0.1:8000/create-treatment-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(treatmentHistoryData)
        }),
        
        fetch('http://127.0.0.1:8000/create-notification/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notificationData)
        })
      ]);

      // Log responses for debugging
      const responseData = await Promise.all(responses.map(r => r.json()));
      console.log('Response data:', responseData);

      // Check if all requests were successful
      const hasError = responses.some(response => !response.ok);
      if (hasError) {
        throw new Error('One or more requests failed');
      }

      alert('Prescription and notification created successfully!');
      handleReset();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to create prescription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRows(rows.map(row => ({
      ...row,
      medicine: '',
      dosage: '',
      timesPerDay: '',
      routine: ''
    })));
    setDisease('');
    setRemarks('');
    setOutcome('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="mt-3 mb-3">
        <Typography variant="h6" gutterBottom>
          Enter Disease
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          required
        />
      </Container>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="prescription table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Medicine Name</StyledTableCell>
              <StyledTableCell>Dosage (mg)</StyledTableCell>
              <StyledTableCell>Times per Day</StyledTableCell>
              <StyledTableCell>Routine</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={row.medicine}
                      onChange={(e) => handleInputChange(index, 'medicine', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">Select Medicine</MenuItem>
                      {medicines.map((medicine) => (
                        <MenuItem key={medicine.id} value={medicine.name}>
                          {medicine.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={row.dosage}
                    onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={row.timesPerDay}
                      onChange={(e) => handleInputChange(index, 'timesPerDay', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">Select Frequency</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={row.routine}
                      onChange={(e) => handleInputChange(index, 'routine', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">Select Timing</MenuItem>
                      <MenuItem value="Before">Before</MenuItem>
                      <MenuItem value="After">After</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Remarks
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          multiline
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Outcome
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          multiline
          rows={2}
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
      </Container>

      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={3} gap={2}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleReset}
          disabled={loading}
        >
          Clear
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Submitting...
            </Box>
          ) : (
            'Submit'
          )}
        </Button>
      </Box>
    </form>
  );
}