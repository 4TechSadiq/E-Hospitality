import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

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
    field: 'Time Schedule',
    headerName: 'Time Schedule',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'Action',
    headerName: 'Age',
    type: 'number',
    width: 90,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 , Action: 'Edit'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,Action: 'Edit' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,Action: 'Edit' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,Action: 'Edit' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,Action: 'Edit' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150,Action: 'Edit' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,Action: 'Edit' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,Action: 'Edit' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,Action: 'Edit' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Appointments() {
  return (
    <>
    <Typography variant="h6" gutterBottom component="div">Appointments</Typography>
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
