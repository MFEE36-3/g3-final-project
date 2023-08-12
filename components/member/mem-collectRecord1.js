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

export default function MemCollectReocrd1({ forum, page }) {
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
    height: '130px',
    fontFamily: 'var(--ff1)',
    position: 'relative',
    left: '-20px',
  };

  return forum[0] ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={rowStyle}>
            <TableCell align="left" sx={ceilStyle2}>
              標題
            </TableCell>
            <TableCell
              align="center"
              sx={ceilStyle}
              style={{
                position: 'relative',
                left: '-20px',
                width: '300px',
              }}
            >
              作者
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              連結
            </TableCell>

            <TableCell align="center" sx={ceilStyle}></TableCell>
          </TableRow>
        </TableHead>
        {forum[0] ? (
          <TableBody>
            {forum
              ?.filter((value, index) => page <= index && index < page + 3)
              .map((row) => {
                return (
                  <TableRow sx={rowStyle} key={v4()}>
                    <TableCell
                      align="left"
                      sx={tdStyle}
                      style={{
                        position: 'relative',
                        left: '20px',
                        width: '600px',
                      }}
                    >
                      【 {row.forum_header} 】
                    </TableCell>

                    <TableCell align="center" sx={tdStyle}>
                      {row.nickname}
                    </TableCell>

                    <Link
                      className={styles.link}
                      style={{ color: 'white' }}
                      href={'http://localhost:3000/forum/' + row.forum_sid}
                    >
                      GO
                    </Link>
                    {/* <button className={styles.delete}>取消收藏</button> */}
                  </TableRow>
                );
              })}
          </TableBody>
        ) : (
          <div className={styles.default}>目前沒有收藏貼文</div>
        )}
      </Table>
    </TableContainer>
  ) : (
    <Link href={'http://localhost:3000/forum'} className={styles.default}>
      尚未收藏貼文，立即前往論壇
    </Link>
  );
}
