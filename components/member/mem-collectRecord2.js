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
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function MemCollectReocrd2({ store, page, setOpen }) {
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

  const tdStyle0 = {
    fontSize: '18px',
    fontWeight: '600',
    width: '300px',
    height: '70px',
    fontFamily: 'var(--ff1)',
  };

  const router = useRouter();

  const deleteRest = (sid) => {
    fetch(process.env.API_SERVER + '/member/deleteRest', {
      method: 'DELETE',
      body: JSON.stringify({ sid }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        Swal.fire({
          title: '刪除成功',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        })
      )
      .then(setOpen('店家'))
      .then(router.push('/member/collect'));
  };

  return store[0] ? (
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
              評分
            </TableCell>

            <TableCell align="center" sx={ceilStyle}>
              連結
            </TableCell>
            <TableCell align="center" sx={ceilStyle}>
              移除
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store
            ?.filter((value, index) => page <= index && index < page + 3)
            .map((row) => (
              <TableRow
                key={v4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  sx={tdStyle0}
                >
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
                  {row.restaurant_rating}
                </TableCell>

                <Link
                  href={'http://localhost:3000/reservation/' + row.sid}
                  className={styles.link2}
                  style={{ color: 'white' }}
                >
                  GO
                </Link>
                <button
                  className={styles.delete2}
                  onClick={() => deleteRest(row.favorite_id)}
                >
                  <Image src={'/member/delete.svg'} width={45} height={45} />
                </button>
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
