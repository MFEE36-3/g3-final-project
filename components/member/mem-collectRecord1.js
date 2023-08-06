import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 } from 'uuid';
import styles from './mem-collectRecord.module.css';
import Link from 'next/link';

export default function MemCollectReocrd1({ forum }) {
  const rowStyle = {
    height: '90px',
    width: '100%',
  };

  const ceilStyle = {
    minWidth: 80,
    color: '#921010',
    fontFamily: 'var(--ff1)',
    fontSize: '20px',
    position: 'relative',
    left: '-20px',
  };

  const ceilStyle2 = {
    minWidth: 80,
    color: '#921010',
    fontFamily: 'var(--ff1)',
    fontSize: '20px',
    position: 'relative',
    left: '50px',
  };

  const tdStyle = {
    fontSize: '18px',
    fontWeight: '600',
    height: '70px',
    fontFamily: 'var(--ff1)',
    position: 'relative',
    left: '-20px',
  };

  return forum ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={rowStyle}>
            <TableCell align="left" sx={ceilStyle2}>
              標題
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              作者
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              發表時間
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              連結
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forum?.map((row) => {
            return (
              <TableRow sx={rowStyle} key={v4()}>
                <TableCell
                  align="left"
                  sx={tdStyle}
                  style={{ position: 'relative', left: '20px' }}
                >
                  【 {row.header} 】
                </TableCell>

                <TableCell align="center" sx={tdStyle}>
                  {row.nickname}
                </TableCell>

                <TableCell align="center" sx={tdStyle}>
                  {row.publishedTime.substring(0, 10)}
                </TableCell>

                <Link
                  className={styles.link}
                  style={{ color: 'white' }}
                  href={'http://localhost:3000/forum/' + row.forum_sid}
                >
                  GO
                </Link>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Link href={'http://localhost:3000/reservation'} className={styles.default}>
      尚未收藏貼文，立即前往論壇
    </Link>
  );
}
