import React from 'react';
import Image from 'next/image';
import styles from './mem-couponCard.module.css';

export default function MemCouponCard({ src, name, content, money, time }) {
  return (
    <>
      <div className={styles.card}>
        <div>
          <Image src={src} width={100} height={120} alt="" />
        </div>
        <div className={styles.box}>{name}</div>
        <div className={styles.box}>{content}</div>
        <div className={styles.box}>{money}</div>
        <div className={styles.box}>{time}</div>
      </div>
    </>
  );
}
