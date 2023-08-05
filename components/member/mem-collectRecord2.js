import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { v4 } from 'uuid';
import styles from './mem-collectRecord.module.css';
import Link from 'next/link';

export default function MemCollectReocrd2({ store }) {
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

  return store ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={rowStyle}>
            <TableCell align="center" sx={ceilStyle}>
              店家
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              照片
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              地址
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              評分
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              連結
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store?.map((row) => (
            <TableRow
              key={v4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row" sx={tdStyle}>
                {row.restaurant_name}
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                <Image
                  src={
                    'http://localhost:3002/img/shops/' + row.restaurant_photo
                  }
                  width={100}
                  height={100}
                  alt=""
                />
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                {row.restaurant_location}
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                {row.restaurant_rating}
              </TableCell>

              <div style={{ color: 'white' }}>
                <Link
                  href={'http://localhost:3000/reservation/' + row.sid}
                  className={styles.link2}
                >
                  GO
                </Link>
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Link href={'http://localhost:3000/reservation'} className={styles.default}>
      尚未收藏店家，立即前往挑選
    </Link>
  );
}
