import React from 'react';
import Image from 'next/image';
import styles from './mem-couponRecord.module.css';

export default function MemCouponRecord({ name, content, money, time }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>{name}</div>
        <div className={styles.box}>{money}元</div>
        <div className={styles.box}>{time}</div>
      </div>
    </>
  );
}
