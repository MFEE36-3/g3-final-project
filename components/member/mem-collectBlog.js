import React from 'react';
import styles from './mem-collectBlog.module.css';

export default function MemCollectBlog({ type, title, time }) {
  let cutTitle = title;
  if (title.length > 25) {
    cutTitle = title.substring(0, 25) + '...';
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.box}>{type}</div>
        <div className={styles.box2}>{cutTitle}</div>
        <div className={styles.box3}>{time}</div>
      </div>
    </>
  );
}
