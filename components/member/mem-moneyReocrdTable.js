import { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './mem-moneyReocrdTable.module.css';
import { v4 } from 'uuid';

export default function MemMoneyReocrdTable({ rows, page }) {
  const rowStyle = {
    height: '90px',
  };

  const ceilStyle = {
    minWidth: 80,
    color: '#921010',
    fontFamily: 'var(--ff1)',
    fontSize: '20px',
    position: 'relative',
    left: '0px',
  };

  const tdStyle = {
    fontSize: '18px',
    fontWeight: '600',
    height: '70px',
    fontFamily: 'var(--ff1)',
    width: '200px',
    position: 'relative',
    left: '0px',
  };

  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table
        sx={{ minWidth: 650, overflow: 'hidden' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={rowStyle}>
            <TableCell align="left" sx={ceilStyle}>
              內容
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              金額
            </TableCell>
            <TableCell align="right" sx={ceilStyle}>
              時間
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ?.filter((value, index) => page <= index && index < page + 5)
            .map((row) => (
              <TableRow key={v4()}>
                <TableCell align="left" sx={tdStyle}>
                  {row.content}
                </TableCell>
                <TableCell align="center" sx={tdStyle}>
                  {row.money}
                </TableCell>
                <TableCell align="right" sx={tdStyle}>
                  {row.time}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
