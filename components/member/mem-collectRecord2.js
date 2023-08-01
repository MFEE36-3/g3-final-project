import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './mem-moneyReocrdTable.module.css';
import Image from 'next/image';
import { v4 } from 'uuid';

export default function MemCollectReocrd2({ store }) {
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
            <TableCell sx={ceilStyle}>店家</TableCell>
            <TableCell sx={ceilStyle}>地址</TableCell>
            <TableCell sx={ceilStyle}>照片</TableCell>
            <TableCell align="right" sx={ceilStyle}>
              評分
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store?.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={tdStyle}>
                {row.restaurant_name}
              </TableCell>

              <TableCell sx={tdStyle}>{row.restaurant_location}</TableCell>
              <TableCell sx={tdStyle}>
                <Image
                  src={
                    'http://localhost:3002/img/shops/' + row.restaurant_photo
                  }
                  width={100}
                  height={100}
                  alt=""
                />
              </TableCell>
              <TableCell align="right" sx={tdStyle}>
                {row.restaurant_rating}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
