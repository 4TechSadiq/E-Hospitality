import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

export default function Bar() {
  return (
    <>
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [100, 130, 155] }]}
      width={350}
      height={300}
    />
    </>
  );
}