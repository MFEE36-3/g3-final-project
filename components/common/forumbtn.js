import React from 'react';
import styles from './forumbtn.module.css';

export default function Forumbtn() {
  return (
    <>
      <button type="text" className={styles.btn}>
        所有看板
      </button>{' '}
      <button type="text" className={styles.btn}>
        隱藏美食板
      </button>{' '}
      <button type="text" className={styles.btn}>
        在地美食板
      </button>{' '}
      <button type="text" className={styles.btn}>
        奢華美食板
      </button>{' '}
      <button type="text" className={styles.btn}>
        深夜美食板
      </button>
      <button type="text" className={styles.btn}>
        小資美食板
      </button>
    </>
  );
}
