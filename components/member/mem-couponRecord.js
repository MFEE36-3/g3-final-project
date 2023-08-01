import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './mem-moneyReocrdTable.module.css';
import { v4 } from 'uuid';

export default function MemCouponRecord({ record }) {
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
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell sx={ceilStyle}>優惠券</TableCell>
            <TableCell align="right" sx={ceilStyle}>
              折扣金額
            </TableCell>
            <TableCell align="right" sx={ceilStyle}>
              獲得時間
            </TableCell>
            <TableCell align="right" sx={ceilStyle}>
              使用狀態
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={tdStyle}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.money}
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.time}
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.status === 2 ? '已使用' : '已過期'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
