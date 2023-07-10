import React from 'react';
import Image from 'next/image';
import styles from './mem-moneyRecord.module.css';
import { Money } from '@mui/icons-material';

export default function MemMoneyRecord({ money, date, time }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>儲值金額:{money}元</div>
        <div className={styles.box}>{date}</div>
        <div className={styles.box}>{time}</div>
      </div>
    </>
  );
}
