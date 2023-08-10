import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './mem-activityList.module.css';
import { v4 } from 'uuid';

export function MemActivityList1({ List1 }) {
  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.cell}>編號</TableCell>
            <TableCell className={styles.cell}>主揪</TableCell>
            <TableCell className={styles.cell}>金額</TableCell>
            <TableCell className={styles.cell}>餐點</TableCell>
            <TableCell className={styles.cell}>店家</TableCell>
            <TableCell className={styles.cell}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List1.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={styles.td}>
                {row.id}
              </TableCell>
              <TableCell className={styles.td}>{row.name}</TableCell>
              <TableCell className={styles.td}>{row.money}</TableCell>
              <TableCell className={styles.td}>{row.content}</TableCell>
              <TableCell className={styles.td}>{row.store}</TableCell>
              <TableCell className={styles.td}>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityList2({ List2 }) {
  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.cell}>編號</TableCell>
            <TableCell className={styles.cell}>金額</TableCell>
            <TableCell className={styles.cell}>餐點</TableCell>
            <TableCell className={styles.cell}>店家</TableCell>
            <TableCell className={styles.cell}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List2.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={styles.td}>
                {row.id}
              </TableCell>
              <TableCell className={styles.td}>{row.money}</TableCell>
              <TableCell className={styles.td}>{row.content}</TableCell>
              <TableCell className={styles.td}>{row.store}</TableCell>
              <TableCell className={styles.td}>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityList3({ List3 }) {
  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.cell}>編號</TableCell>
            <TableCell className={styles.cell}>店家</TableCell>
            <TableCell className={styles.cell}>人數</TableCell>
            <TableCell className={styles.cell}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List3.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={styles.td}>
                {row.id}
              </TableCell>
              <TableCell className={styles.td}>{row.store}</TableCell>
              <TableCell className={styles.td}>{row.number}</TableCell>
              <TableCell className={styles.td}>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityList4({ List4 }) {
  return (
    <TableContainer component={Paper} className={styles.body}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.cell}>編號</TableCell>
            <TableCell className={styles.cell}>金額</TableCell>
            <TableCell className={styles.cell}>餐點</TableCell>
            <TableCell className={styles.cell}>店家</TableCell>
            <TableCell className={styles.cell}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {List4.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={styles.td}>
                {row.id}
              </TableCell>
              <TableCell className={styles.td}>{row.money}</TableCell>
              <TableCell className={styles.td}>{row.content}</TableCell>
              <TableCell className={styles.td}>{row.store}</TableCell>
              <TableCell className={styles.td}>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
