import React from 'react';
import styles from './mem-nologin.module.css';

export default function MemNologin() {
  return (
    <div className={styles.container}>
      <div className={styles.area}>尚未登入會員，即將回到首頁</div>
    </div>
  );
}
