import React from 'react';
import Image from 'next/image';
import styles from './mem-activityCard.module.css';

export default function MemAcitvityCard({ type, title, content, money, time }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>【{type}】</div>
        <div className={styles.box}>店家:{title}</div>
        <div className={styles.box}>內容:{content}</div>
        <div className={styles.box}>價格:{money}</div>
        <div className={styles.box}>日期:{time}</div>
      </div>
    </>
  );
}
