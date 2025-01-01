import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';

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

export default function PrescriptionTable(patientId, doc_id) {
  const [rows, setRows] = React.useState([
    { id: 1, medicine: '', dosage: '', timesPerDay: '', routine: '' },
    { id: 2, medicine: '', dosage: '', timesPerDay: '', routine: '' },
    { id: 3, medicine: '', dosage: '', timesPerDay: '', routine: '' },
  ]);
  const [disease, setDisease] = React.useState('');
  const [remarks, setRemarks] = React.useState('');
  const [outcome, setOutcome] = React.useState('');
  const [medicines, setMedicines] = React.useState([]);

  React.useEffect(() => {
    // Fetch medicine data from API
    axios.get('http://127.0.0.1:8000/list-medicine')
      .then(response => {
        setMedicines(response.data);
      })
      .catch(error => {
        console.error('Error fetching medicine data:', error);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const medicalConditionData = {
      user: patientId,
      condition: disease,
      severity: 'Moderate',
      medication: rows.map((row) => `${row.medicine} (${row.dosage} mg, ${row.routine})`).join(', '),
      doctor: doc_id,
      status: 'Under Treatment',
    };

    const treatmentHistoryData = {
      user: patientId,
      medical_condition: disease,
      remarks,
      outcome,
    };

    try {
      await axios.post('http://127.0.0.1:8000/create-med-condition', medicalConditionData);
      await axios.post('http://127.0.0.1:8000/create-treatment-history', treatmentHistoryData);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="mt-3 mb-3 p-0">
        <Typography variant="h6" gutterBottom>
          Enter Disease
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />
      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="prescription table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SINo</StyledTableCell>
              <StyledTableCell align="right">Medicine Name</StyledTableCell>
              <StyledTableCell align="right">Dosage (mg)</StyledTableCell>
              <StyledTableCell align="right">Times per Day</StyledTableCell>
              <StyledTableCell align="right">Routine (Before/After)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Autocomplete
                    options={medicines.map((med) => med.name)}
                    value={row.medicine}
                    onChange={(e, value) => handleInputChange(index, 'medicine', value)}
                    renderInput={(params) => <TextField {...params} variant="filled" size="small" />}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    variant="filled"
                    size="small"
                    value={row.dosage}
                    onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Select
                    value={row.timesPerDay || ''}
                    onChange={(e) => handleInputChange(index, 'timesPerDay', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Select
                    value={row.routine || ''}
                    onChange={(e) => handleInputChange(index, 'routine', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Before">Before</MenuItem>
                    <MenuItem value="After">After</MenuItem>
                  </Select>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container>
        <Typography variant="h6" gutterBottom>
          Remarks
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Typography variant="h6" gutterBottom>
          Outcome
        </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
      </Container>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={3} gap={2}>
        <Button variant="contained" color="secondary" type="reset">
          Clear
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}
