import React from 'react';
import styles from './mem-moneyCard.module.css';
import Link from 'next/link';

export default function MemMoneyCard() {
  return (
    <div className={styles.cardBox}>
      <Link href={''} className={styles.link}>
        <div className={styles.card}>
          <p>尊榮會員一個月</p>
          <p>199元</p>
        </div>
      </Link>
      <Link href={''} className={styles.link}>
        <div className={styles.card}>
          <p>尊榮會員三個月</p>
          <p>549元</p>
        </div>
      </Link>
      <Link href={''} className={styles.link}>
        <div className={styles.card}>
          <p>尊榮會員六個月</p>
          <p>999元</p>
        </div>
      </Link>
      <Link href={''} className={styles.link}>
        <div className={styles.card}>
          <p>尊榮會員一年</p>
          <p>1799元</p>
        </div>
      </Link>
    </div>
  );
}
