import React from 'react';
import Image from 'next/image';
import styles from './mem-activityRecord.module.css';

export default function MemActivityRecord({
  type,
  title,
  content,
  money,
  time,
  score,
}) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>【{type}】</div>
        <div className={styles.box}>{title}</div>
        <div className={styles.box}>{content}</div>
        <div className={styles.box}>價格:{money}</div>
        <div className={styles.box}>評分:{score}</div>
        <div className={styles.box}>{time}</div>
      </div>
    </>
  );
}
