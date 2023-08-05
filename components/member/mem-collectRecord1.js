import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 } from 'uuid';

export default function MemCollectReocrd1({ forum }) {
  const rowStyle = {
    height: '90px',
  };

  const ceilStyle = {
    minWidth: 80,
    color: '#921010',
    fontFamily: 'var(--ff1)',
    fontSize: '20px',
  };

  const tdStyle = {
    fontSize: '18px',
    fontWeight: '600',
    height: '70px',
    fontFamily: 'var(--ff1)',
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={rowStyle}>
            <TableCell align="center" sx={ceilStyle}>
              標題
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              作者
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              發表時間
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forum?.map((row) => {
            return (
              <TableRow
                key={v4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={tdStyle}>
                  【{row.header}】
                </TableCell>

                <TableCell align="center" sx={tdStyle}>
                  {row.nickname}
                </TableCell>

                <TableCell align="center" sx={tdStyle}>
                  {row.publishedTime.substring(0, 10)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
