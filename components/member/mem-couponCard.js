import React from 'react';
import styles from './mem-couponCard.module.css';

export default function MemCouponCard({ name, money, time }) {
  return (
    <div className={styles.card}>
      <div className={styles.money}>
        <div className={styles.detail}>{money}</div>
      </div>
      <div>
        <div className={styles.box}>
          <div> 名稱 :</div> <div className={styles.detail}>{name}</div>
        </div>

        <div className={styles.box}>
          <div> 期限 :</div> <div className={styles.detail}>{time}</div>
        </div>
      </div>
    </div>
  );
}
