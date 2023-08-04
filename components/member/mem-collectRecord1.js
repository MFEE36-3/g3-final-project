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

export default function MemCollectReocrd1({ ListForum }) {
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
            <TableCell sx={ceilStyle}>標題</TableCell>
            <TableCell align="right" sx={ceilStyle}>
              分類
            </TableCell>

            <TableCell align="right" sx={ceilStyle}>
              作者
            </TableCell>
            <TableCell align="right" sx={ceilStyle}>
              發表時間
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListForum.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={tdStyle}>
                {row.title}
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.type}
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.author}
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
