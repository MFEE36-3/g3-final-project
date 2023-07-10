import React from 'react';
import Image from 'next/image';
import styles from './mem-collectBlog.module.css';

export default function MemCollectBlog({ type, title, time }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>【{type}】</div>
        <div className={styles.box}>{title}</div>
        <div className={styles.box}>{time}</div>
      </div>
    </>
  );
}
