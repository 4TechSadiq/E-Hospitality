import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from '@mui/material';

function createData(
  condition: string,
  severity: string,
  medication: string,
  doctor: string,
  status: string
) {
  return {
    condition,
    severity,
    medication,
    doctor,
    status,
    history: [
      {
        date: '2024-06-01',
        remarks: 'Initial diagnosis',
        outcome: 'Ongoing treatment',
      },
      {
        date: '2024-06-15',
        remarks: 'Follow-up visit',
        outcome: 'Improvement observed',
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.condition}
        </TableCell>
        <TableCell>{row.severity}</TableCell>
        <TableCell>{row.medication}</TableCell>
        <TableCell>{row.doctor}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Treatment History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Outcome</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.remarks}</TableCell>
                      <TableCell>{historyRow.outcome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Diabetes', 'Moderate', 'Metformin 500mg', 'Dr. Rajesh Kumar', 'Under Treatment'),
  createData('Hypertension', 'Severe', 'Amlodipine 5mg', 'Dr. Sneha Gupta', 'Ongoing'),
  createData('Asthma', 'Moderate', 'Inhaler', 'Dr. Manish Verma', 'Stable'),
  createData('Viral Fever', 'Mild', 'Paracetamol 500mg', 'Dr. Anita Sharma', 'Resolved'),
];

export default function History() {
  return (
    <>
      <Container className="mt-4 mb-5 flex-wrap">
        <Typography variant="h4" gutterBottom>
          Medical History
        </Typography>
        <TableContainer className="mt-4" component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Condition</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Medication</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.condition} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
