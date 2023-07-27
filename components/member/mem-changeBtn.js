import React from 'react';
import styles from './mem-changeBtn.module.css';

export default function MemChangeBtn({ title, event }) {
  return (
    <button className={styles.btn} value={title} onClick={event}>
      {title}
    </button>
  );
}
