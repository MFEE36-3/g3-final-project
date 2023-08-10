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

export default function MemCollectReocrd2({ ListStore }) {
  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.cell}>店家</TableCell>
            <TableCell align="right" className={styles.cell}>
              類型
            </TableCell>

            <TableCell align="right" className={styles.cell}>
              地址
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListStore.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={styles.td}>
                {row.store}
              </TableCell>
              <TableCell align="right" className={styles.td}>
                {row.type}
              </TableCell>
              <TableCell align="right" className={styles.td}>
                {row.address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
