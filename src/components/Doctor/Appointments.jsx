import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'timeSchedule',
    headerName: 'Time Schedule',
    description: 'This column is derived from first and last name.',
    sortable: false,
    width: 200,
    valueGetter: (params) => `${params?.row?.firstName || ''} ${params?.row?.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <Link to='appointments'>
      <Button
        variant="contained"
        color="primary"
      >
        Open
      </Button>
      </Link>
    ),
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25 },
  { id: 6, lastName: 'Melisandre', firstName: "Cinderella", age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const handleActionClick = (row) => {
  alert(`Action clicked for ${row.firstName || 'Unknown'} ${row.lastName || 'Unknown'}`);
};

const paginationModel = { page: 0, pageSize: 5 };

export default function Appointments() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Appointments
      </Typography>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
