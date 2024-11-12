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
    { id: 4, medicine: '', dosage: '', timesPerDay: '', routine: '' },
    { id: 5, medicine: '', dosage: '', timesPerDay: '', routine: '' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
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
                <TextField
                  variant="filled"
                  size="small"
                  value={row.medicine}
                  onChange={(e) => handleInputChange(index, 'medicine', e.target.value)}
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
                <TextField
                  variant="filled"
                  size="small"
                  value={row.timesPerDay}
                  onChange={(e) => handleInputChange(index, 'timesPerDay', e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  variant="filled"
                  size="small"
                  value={row.routine}
                  onChange={(e) => handleInputChange(index, 'routine', e.target.value)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
