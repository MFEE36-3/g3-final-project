import React from 'react';
import styles from './mem-collectBlog.module.css';

export default function MemCollectBlog({ type, title, time }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>【{type}】</div>
        <div className={styles.box2}>{title}</div>
        <div className={styles.box3}>{time}</div>
      </div>
    </>
  );
}
