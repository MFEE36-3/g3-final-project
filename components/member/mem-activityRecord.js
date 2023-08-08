import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './mem-activityRecord.module.css';
import { v4 } from 'uuid';

export function MemActivityRecord1({ Record1 }) {
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
            <TableCell sx={ceilStyle}>主揪</TableCell>
            <TableCell sx={ceilStyle}>金額</TableCell>
            <TableCell sx={ceilStyle}>餐點</TableCell>
            <TableCell sx={ceilStyle}>店家</TableCell>
            <TableCell sx={ceilStyle}>時間</TableCell>
            <TableCell sx={ceilStyle}>評分</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record1.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={tdStyle}>{row.id}</TableCell>
              <TableCell sx={tdStyle}>{row.money}</TableCell>
              <TableCell sx={tdStyle}>{row.content}</TableCell>
              <TableCell sx={tdStyle}>{row.store}</TableCell>
              <TableCell sx={tdStyle}>{row.time}</TableCell>
              <TableCell sx={tdStyle}>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityRecord2({ Record2 }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>編號</TableCell>
            <TableCell>金額</TableCell>
            <TableCell>餐點</TableCell>
            <TableCell>店家</TableCell>
            <TableCell>時間</TableCell>
            <TableCell>評分</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record2.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.money}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.store}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityRecord3({ Record3 }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>編號</TableCell>
            <TableCell>金額</TableCell>
            <TableCell>人數</TableCell>
            <TableCell>店家</TableCell>
            <TableCell>時間</TableCell>
            <TableCell>評分</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record3.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.money}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.store}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MemActivityRecord4({ Record4 }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>編號</TableCell>
            <TableCell>金額</TableCell>
            <TableCell>餐點</TableCell>
            <TableCell>店家</TableCell>
            <TableCell>時間</TableCell>
            <TableCell>評分</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record4.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.money}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.store}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
