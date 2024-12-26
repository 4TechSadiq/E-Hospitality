import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
        <TableCell component="th" scope="row">{row.condition}</TableCell>
        <TableCell>{row.severity}</TableCell>
        <TableCell>{row.medication}</TableCell>
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
                  {(row.history || []).map((historyRow, index) => (
                    <TableRow key={index}>
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
    </>
  );
}

export default function History() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const conditionResponse = await axios.get('http://127.0.0.1:8000/list-med-condition', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const historyResponse = await axios.get('http://127.0.0.1:8000/list-treatment-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const conditions = conditionResponse.data;
        const histories = historyResponse.data;

        // Map histories to their corresponding medical conditions
        const mergedData = conditions.map((condition) => ({
          ...condition,
          history: histories.filter((history) => history.medical_condition === condition.id),
        }));

        setRows(mergedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading medical history...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Failed to load medical history.
        </Typography>
      </Container>
    );
  }

  return (
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
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
